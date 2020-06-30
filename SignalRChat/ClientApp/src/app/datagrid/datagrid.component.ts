import { Component } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { DxDataGridModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';

@Component({
    selector: 'app-datagrid',
    templateUrl: './datagrid.component.html',
    styleUrls: ['./datagrid.component.css']
})

export class DatagridComponent {

  dataSource: any;
  connectionStarted: boolean;

  constructor() {
    this.connectionStarted = false;

    const hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:44307/hub")
      .build();

    const store = new CustomStore({
      load: () => hubConnection.invoke("getMessages"),
      key: "id"
    });

    hubConnection
      .start()
      .then(() => {
        hubConnection.on("messageRecieved", (data: any) => {
          store.push([{ type: "update", key: data.symbol, data: data }]);
        });
        this.dataSource = store;
        this.connectionStarted = true;
      });
  }
}
