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
  
//   @Component({
//     selector: 'app-apicurio-host',
//     template: `
//       <data-mapper #dataMapperComponent></data-mapper>
//     `,
//     providers: [
//       MappingManagementService,
//       ErrorHandlerService,
//       DocumentManagementService,
//     ],
//   })

@Component({
    selector: 'app-data-mapper',
    template: `<data-mapper #dataMapperHostComponent></data-mapper>`,
    providers: [
      MappingManagementService,
      ErrorHandlerService,
      DocumentManagementService,
    ],
  })
  export class DataMapperHostComponent implements OnInit, OnDestroy, OnChanges {
    @Input() documentId: string;
    @Input() inputDocuments: IDocumentProps[];
    @Input() outputDocument: IDocumentProps[];
    @Input() initialMappings?: string;
    @Input() baseJavaInspectionServiceUrl: string="http://localhost:8585/v2/atlas/java/";
    @Input() baseXMLInspectionServiceUrl: string="http://localhost:8585/v2/atlas/xml/";
    @Input() baseJSONInspectionServiceUrl: string="http://localhost:8585/v2/atlas/json/";
    @Input() baseMappingServiceUrl: string="http://localhost:8585/v2/atlas/";
    @Output() outputMappings = new EventEmitter<string>();

    private saveMappingSubscription: Subscription;
    private modifiedMappings?: string;

    
    constructor(private initializationService: InitializationService) {}
  
    ngOnInit() {
      this.reset();
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      console.log("INpiut" + this.inputDocuments);
      console.log("ooutput" + this.outputDocument);
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
      var c: ConfigModel = this.initializationService.cfg;
  
       c.initCfg.classPath = environment.classpath;
       c.initCfg.xsrfCookieName = environment.xsrf.cookieName;
       c.initCfg.xsrfDefaultTokenValue = environment.xsrf.defaultTokenValue;
       c.initCfg.xsrfHeaderName = environment.xsrf.headerName;
  
      const makeUrl = (url: string) => {
        return !url.startsWith('http') &&
          !url.startsWith(this.baseMappingServiceUrl)
          ? this.baseMappingServiceUrl + url
          : url;
      };
  
      // initialize base urls for our service calls
      c.initCfg.baseMappingServiceUrl = this.baseMappingServiceUrl;
      c.initCfg.baseJavaInspectionServiceUrl = makeUrl(
        this.baseJavaInspectionServiceUrl
      );
      c.initCfg.baseXMLInspectionServiceUrl = makeUrl(
        this.baseXMLInspectionServiceUrl
      );
      c.initCfg.baseJSONInspectionServiceUrl = makeUrl(
        this.baseJSONInspectionServiceUrl
      );
  
       
      // // enable the navigation bar and import/export for stand-alone
      c.initCfg.disableNavbar = false;
      c.initCfg.disablePublicGetterSetterFields = false;
      
 
      //
      c.initCfg.disableMappingPreviewMode = false;
  
  
    //   this.inputDocuments.forEach(d => {
    //     const inputDoc: DocumentInitializationModel = new DocumentInitializationModel();
    //     inputDoc.type = d.documentType;
    //     inputDoc.inspectionType = d.inspectionType;
    //     inputDoc.inspectionSource = d.inspectionSource;
    //     inputDoc.inspectionResult = d.inspectionResult;
    //     inputDoc.id = d.id;
    //     inputDoc.name = d.name;
    //     inputDoc.description = d.description;
    //     inputDoc.isSource = true;
    //     inputDoc.showFields = d.showFields;
    //     c.addDocument(inputDoc);
    //   });
  
      var outputDoc: DocumentInitializationModel = new DocumentInitializationModel();
      //outputDoc.type = this.outputDocument.documentType;
      //outputDoc.inspectionType = this.outputDocument.inspectionType;
      //outputDoc.inspectionSource = this.outputDocument.inspectionSource;
      //outputDoc.inspectionResult = this.outputDocument.inspectionResult;
      //outputDoc.id = this.outputDocument.id;
      //outputDoc.name = this.outputDocument.name;
      //outputDoc.description = this.outputDocument.description;
      //outputDoc.isSource = false;
      //outputDoc.showFields = this.outputDocument.showFields;
     // c.addDocument(outputDoc);
  
      if (this.initialMappings) {
        try {
          MappingSerializer.deserializeMappingServiceJSON(JSON.parse(this.initialMappings), c);
        } catch (err) {
          // TODO popup or error alert?  At least catch this so we initialize
          console.error(err);
        }
      }
      console.log("INpiut111" + this.inputDocuments);
      console.log("ooutput111" + this.outputDocument);
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