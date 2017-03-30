import { ChatsOptionsComponent } from './../chats-options/chats-options';
import { MessagesPage } from './../messages/messages';
import { Chats, Messages } from './../../../api/server/collections';
import { Chat } from 'api/models';
import { NavController, PopoverController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage implements OnInit {

  chats:Observable<Chat[]>;

  constructor(private navCtrl: NavController, private popoverCtrl: PopoverController) {
  }

  showOptions(): void {
    const popover = this.popoverCtrl.create(ChatsOptionsComponent, {}, {
      cssClass: 'options-popover chats-options-popover'
    });

    popover.present();
  }

  ngOnInit(): void {
    this.chats = Chats
      .find({})
      .mergeMap((chats: Chat[]) =>
        Observable.combineLatest(
          ...chats.map((chat: Chat) =>
            Messages
              .find({ chatId: chat._id })
              .startWith(null)
              .map(messages => {
                if (messages) chat.lastMessage = messages[0];
                return chat;
              })
          )
        )
      ).zone();
  }

  showMessages(chat): void {
    this.navCtrl.push(MessagesPage, { chat });
  }

  removeChat(chat: Chat): void {
    Chats.remove({ _id: chat._id }).subscribe(() => {
    });
  }




}
