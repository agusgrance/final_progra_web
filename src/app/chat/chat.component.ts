import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Users } from '../users';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users: Users[] = []
  receiver: any;
  receiverData: any;

  myToken: any;
  currentChat: any;
  currMessage: any = '';
  constructor(private dataService: ApiService, private route: ActivatedRoute) { }

  getUsers() {
    this.dataService.getUsers()
      .subscribe({
        next: (response) => {
          this.users = response;
          this.receiverData = response.find((res: any) => res.id == this.receiver)

        },
        error: (e) => { }
      });
  }

  getChatData() {
    this.dataService.getChat(this.receiver, this.myToken)
      .subscribe((response) => {
        this.currentChat = response?.map((res: any) => {
          let chat = res;
          chat.sender = this.users?.find((user) => user.id == chat?.sender_id)?.name
          chat.receiver = this.users?.find((user) => user.id == chat?.receiver_id)?.name
          return chat
        });
      });
  }

  getMessage(e: any) {
    this.currMessage = e.target.value
  }
  addMessage() {
    this.dataService.addMessage(this.myToken, this.receiver, this.currMessage)
      .subscribe(() => {
        this.getChatData();
        this.currMessage = '';
      });
  }

  ngOnInit(): void {
    this.receiver = this.route.snapshot.paramMap.get('id');
    this.myToken = this.dataService.getToken();
    this.getUsers();
    this.getChatData()
  }

}
