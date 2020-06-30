import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  connection: signalR.HubConnection;
  username;
  tbMessage: HTMLInputElement;
  range: [];

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("/hub")
      .build();
  }

  ngOnInit() {
    const divMessages: HTMLDivElement = document.querySelector("#divMessages");
    this.tbMessage = document.querySelector("#tbMessage");
    const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
    this.username = new Date().getTime();

    
    this.connection.on("messageReceived", (username: string, message: string) => {
      let m = document.createElement("div");

      m.innerHTML =
        `<div class="message-author">${username}</div><div>${message}</div>`;

      divMessages.appendChild(m);
      divMessages.scrollTop = divMessages.scrollHeight;
    });

    this.connection.start().catch(err => document.write(err));

    this.tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        this.send();
      }
    });

    btnSend.addEventListener("click", () => this.send());
  }

  send() {
    this.connection.send("newMessage", this.username, this.tbMessage.value)
      .then(() => this.tbMessage.value = "");
  }

  invokeGetMessages() {
    this.connection.invoke("getMessages").then((res) => {
      this.range = res;
    });
    
  }
}
