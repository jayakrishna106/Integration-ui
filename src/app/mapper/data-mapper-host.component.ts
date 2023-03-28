import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import {
  ConfigModel,
  DataMapperAppComponent,
  DocumentInitializationModel,
  DocumentManagementService,
  ErrorHandlerService,
  InitializationService,
  MappingManagementService,
  MappingDefinition,
  MappingSerializer,
} from '@atlasmap/atlasmap-data-mapper';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { IDocumentProps } from './mapper.component';



@Component({
 // schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  selector: 'app-apicurio-host',
  template: 
   `
   <data-mapper #dataMapperHostComponent></data-mapper>
   `
  ,
  providers: [
    MappingManagementService,
    ErrorHandlerService,
    DocumentManagementService,
  ],
})

export class DataMapperHostComponent implements OnInit, OnDestroy, OnChanges {
  @Input() documentId: string;
  @Input() inputDocuments: IDocumentProps[];
  @Input() outputDocument: IDocumentProps;
  @Input() initialMappings?: string;
 // @Input() baseJavaInspectionServiceUrl: string;
 // @Input() baseXMLInspectionServiceUrl: string ;
 // @Input() baseJSONInspectionServiceUrl: string ;
 // @Input() baseMappingServiceUrl: string ;
  @Output() outputMappings = new EventEmitter<string>();
  private saveMappingSubscription: Subscription;
  private modifiedMappings?: string;

  constructor(private initializationService: InitializationService) {}

  ngOnInit() {
    this.reset();
    console.log("testre");
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log("ngOncehhh");
    if (
      Object.keys(changes).length === 1 &&
      (changes['initialMappings'] &&
        changes['initialMappings'].previousValue !== this.modifiedMappings)
    ) {
      // do nothing, it's us updating the mappings and getting it back from the app component
    } else {
      this.reset();
    }
  }

  reset() {
    if (this.saveMappingSubscription) {
      this.saveMappingSubscription.unsubscribe();
    }
    this.initializationService.resetConfig();

    // initialize config information before initializing services
    const c: ConfigModel = this.initializationService.cfg;

     c.initCfg.classPath = environment.classpath;
     c.initCfg.xsrfCookieName = environment.xsrf.cookieName;
     c.initCfg.xsrfDefaultTokenValue = environment.xsrf.defaultTokenValue;
     c.initCfg.xsrfHeaderName = environment.xsrf.headerName;

    const makeUrl = (url: string) => {
      return !url.startsWith('http') &&
      
      !url.startsWith("http://localhost:8585/v2/atlas/")
      ? "http://localhost:8585/v2/atlas/" + url
      : url;

      // !url.startsWith(this.baseMappingServiceUrl)
        // ? this.baseMappingServiceUrl + url
        // : url;
    };

    // initialize base urls for our service calls
    c.initCfg.baseMappingServiceUrl = "http://localhost:8585/v2/atlas/";//this.baseMappingServiceUrl;
    c.initCfg.baseJavaInspectionServiceUrl = makeUrl(
     // this.baseJavaInspectionServiceUrl
     "http://localhost:8585/v2/atlas/java/"
    );
    c.initCfg.baseXMLInspectionServiceUrl = makeUrl(
        "http://localhost:8585/v2/atlas/xml/"
        // this.baseXMLInspectionServiceUrl
    );
    c.initCfg.baseJSONInspectionServiceUrl = makeUrl(
        "http://localhost:8585/v2/atlas/json/"
        // this.baseJSONInspectionServiceUrl
    );

    // // enable the navigation bar and import/export for stand-alone
    c.initCfg.disableNavbar = true;
    //
    c.initCfg.disableMappingPreviewMode = false;

    this.inputDocuments.forEach(d => {
      const inputDoc: DocumentInitializationModel = new DocumentInitializationModel();
      inputDoc.type = d.documentType;
      inputDoc.inspectionType = d.inspectionType;
      inputDoc.inspectionSource = d.inspectionSource;
      inputDoc.inspectionResult = d.inspectionResult;
      inputDoc.id = d.id;
      inputDoc.name = d.name;
      inputDoc.description = d.description;
      inputDoc.isSource = true;
      inputDoc.showFields = d.showFields;
      c.addDocument(inputDoc);
    });

    const outputDoc: DocumentInitializationModel = new DocumentInitializationModel();
    outputDoc.type = this.outputDocument.documentType;
    outputDoc.inspectionType = this.outputDocument.inspectionType;
    outputDoc.inspectionSource = this.outputDocument.inspectionSource;
    outputDoc.inspectionResult = this.outputDocument.inspectionResult;
    outputDoc.id = this.outputDocument.id;
    outputDoc.name = this.outputDocument.name;
    outputDoc.description = this.outputDocument.description;
    outputDoc.isSource = false;
    outputDoc.showFields = this.outputDocument.showFields;
    c.addDocument(outputDoc);

    if (this.initialMappings) {
      try {
        MappingSerializer.deserializeMappingServiceJSON(JSON.parse(this.initialMappings), c);
      } catch (err) {
        // TODO popup or error alert?  At least catch this so we initialize
        console.error(err);
      }
    }

    this.saveMappingSubscription = c.mappingService.mappingUpdated$.subscribe(
      () => {
        const json = MappingSerializer.serializeMappings(c);
        this.modifiedMappings = JSON.stringify(json);
        this.outputMappings.emit(this.modifiedMappings);
      }
    );

    this.initializationService.initialize();
  }

  ngOnDestroy() {
    if (this.saveMappingSubscription) {
      this.saveMappingSubscription.unsubscribe();
    }
  }
}