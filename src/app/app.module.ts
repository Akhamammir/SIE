import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
//begins primeng------------------------------------------
import {ButtonModule, FileUploadModule, FieldsetModule, ToggleButtonModule,
    InputMaskModule, CalendarModule, ToolbarModule,
    DataGridModule, MenubarModule, PanelModule, ConfirmDialogModule, DataTableModule,
    DropdownModule, CheckboxModule, DataListModule,
    ListboxModule, RadioButtonModule, ChipsModule, PanelMenuModule,
    PickListModule, DataScrollerModule,
    ContextMenuModule
  } from 'primeng/primeng';
import {StepsModule} from 'primeng/steps';
import {GrowlModule} from 'primeng/growl';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DataViewModule} from 'primeng/dataview';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ScheduleModule} from 'primeng/schedule';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {TableModule} from 'primeng/table';
import {SidebarModule} from 'primeng/sidebar';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import {ChartModule} from 'primeng/chart';
import {DialogModule} from 'primeng/dialog';
import {EditorModule} from 'primeng/editor';
import {InplaceModule} from 'primeng/inplace';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ToastModule} from 'primeng/toast';
import {ProgressBarModule} from 'primeng/progressbar';
import {MessageService} from 'primeng/api';
import {LightboxModule} from 'primeng/lightbox';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
// ----------Begins app
import {Login} from './App/Login/Log';
import {Remmits} from './App/Remmit/Remmit';
import {CatalogRem} from './App/ListRem/GenRem';
import {Auth} from './App/Auth/Auth';
import {Main} from './App/Dashboard/Main';
import {Users} from './App/Users/Usr';
import {Provs} from './App/Providers/Prov';
import { Routing } from './Router';
import {Prods} from './App/Products/Prod';
import {Cat} from './App/Categories/Cat';
import {Clnt} from './App/Clients/Clnt';
import {Cots} from './App/Cotizations/Cots';
import {Catalog} from './App/ListCots/Gen';
import {Links} from './App/Enlaces/Lnk';
import {Fac} from './App/Facturas/Fact';
import {FactalogComponent} from './App/ListFacts/GenF';
import {Pactalog} from './App/ListPO/GenP';
import {Comp} from './App/Compras/Comp';
import {CompEco} from './App/CompEcosa/CompEco';
import {ComprasG} from './App/Kardex/CompG';
import {Envios} from './App/Envios/Env';
import {High} from './App/AltaAdmin/High';
import {EnviosEc} from './App/EnviosEcosa/EnvEc';
import {Rols} from './App/Roles/Roles';
import {Ticketeer} from './App/Ticketeer/Ticketeer';
import {EnviosEco} from './App/EnviosEcosta/EnvEco';
import {Fact} from './App/Facturacion/Facting';
import {DelvingCli} from './App/ClientDeliveries/DelvingCli';
import {TCatalog} from './App/Ticketlist/TList';
import {Delving} from './App/Deliveries/Delving';
import {CatalogR} from './App/ListRelation/GenR';
import {Ticketup} from './App/TicketUp/Ticketup';
import {Trans} from './Transfer/Transfer';
// ------- Begin of FSH App
import {LoginFSH} from './FSH/Login/Login';
import {MainFSH} from './FSH/Dashboard/Dashboard';
const Aroute: Routes =[
  {path: '', component:Login},
  {path: 'Auth/:id/:Roll', component: Auth},
  {path: 'main/:id/:Roll', component: Main},
  {path: 'Usr/:id/:Roll', component: Users},
  {path: 'Roll/:id/:Roll', component: Rols},
  {path: 'Prov/:id/:Roll', component: Provs},
  {path: 'Prod/:id/:Roll', component: Prods},
  {path: 'Cat/:id/:Roll', component: Cat},
  {path: 'Clt/:id/:Roll', component: Clnt},
  {path: 'Cots/:id/:Roll', component: Catalog},
  {path: 'POs/:id/:Roll', component: Pactalog},
  {path: 'New/:id/:Roll', component: Cots},
  {path: 'Edit/:id/:Roll', component: Cots},
  {path: 'Link/:id/:Roll', component: Links},
  {path: 'Factalog/:id/:Roll', component: FactalogComponent},
  {path: 'Fact/:id/:Roll', component: Fac},
  {path: 'Remms/:id/:Roll', component: CatalogRem},
  {path: 'Com/:id/:Roll', component: Comp},
  {path: 'ComE/:id/:Roll', component: CompEco},
  {path: 'Kard/:id/:Roll', component: ComprasG},
  {path: 'Env/:id/:Roll', component: Envios},
  {path: 'EnvEc/:id/:Roll', component: EnviosEc},
  {path: 'EnvEco/:id/:Roll', component: EnviosEco},
  {path: 'High/:id/:Roll', component: High},
  {path: 'Remm/:id/:Roll', component: Remmits},
  {path: 'Facting/:id/:Roll', component: Fact},
  {path: 'DelvingCli/:id/:Roll', component: DelvingCli},
  {path: 'Delving/:id/:Roll', component: Delving},
  {path: 'Rels/:id/:Roll', component: CatalogR},
  {path: 'Ticket/:id/:Roll', component: Ticketeer},
  {path: 'TicketL/:id/:Roll', component: TCatalog},
  {path: 'CreateT/:id/:Roll', component: Ticketup},
  {path: 'FSH', component: LoginFSH},
  {path: 'FSH/Login', component: LoginFSH},
  {path: 'FSH/Main/:id/:Roll', component: MainFSH},
  {path: 'T', component: Trans}
];
@NgModule({
  declarations: [
     Routing, Login, Main, Users, Provs, Prods, Cat, Clnt, Cots, Catalog,
      Links, Fac, FactalogComponent, Comp, ComprasG, Envios, EnviosEc, Rols, High,
      EnviosEco, Fact, DelvingCli, Delving, CatalogR, Trans, Ticketeer, Ticketup,
      TCatalog, Pactalog, Auth, CompEco, Remmits, CatalogRem,
      LoginFSH, MainFSH
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ButtonModule, GrowlModule, FileUploadModule, FieldsetModule, ToggleButtonModule, ChartModule,
     InputMaskModule, InputTextModule, SelectButtonModule, CalendarModule, TabViewModule,
      PanelModule, ToolbarModule, DataGridModule, MenubarModule, ConfirmDialogModule,
       DataTableModule, DropdownModule, CheckboxModule, DataListModule, DialogModule,
        InputTextareaModule, ListboxModule, OverlayPanelModule, RadioButtonModule, ChipsModule,
        PanelMenuModule, PickListModule, DataScrollerModule, CardModule, ScheduleModule,
        InputSwitchModule, ContextMenuModule, TableModule, SidebarModule, DataViewModule,
        BreadcrumbModule, EditorModule, StepsModule, InplaceModule, AutoCompleteModule,
        ProgressSpinnerModule, ToastModule, ProgressBarModule, LightboxModule, 
    RouterModule.forRoot(Aroute)
  ],
  providers: [MessageService],
  bootstrap: [Routing]
})
export class AppModule { }
