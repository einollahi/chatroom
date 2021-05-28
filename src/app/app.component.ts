import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { ChatService } from './shared/services/chat.service';
import * as moment from 'jalali-moment';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('chats') private myScrollContainer: ElementRef;

  userList: string[] = [];
  userCount: number = 0;

  username: FormControl = new FormControl(null);
  message: FormControl = new FormControl(null);
  messageList: FormArray = new FormArray([]);

  subscription: Subscription = new Subscription();

  showLoginPage: boolean = false;

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.listenToUserLogin().subscribe((data: any) => {
        this.userList = data?.users;
        this.userCount = data?.userCount;
      })
    );
    this.subscription.add(
      this.userService.listenToUserDisconnect().subscribe((data: any) => {
        this.userList = data?.users;
        this.userCount = data?.userCount;
      })
    );
    this.subscription.add(
      this.authService.getAuthState().subscribe((data: boolean) => {
        this.showLoginPage = !data;

        if (!data) return;

        this.subscription.add(
          this.chatService.listenToChat().subscribe((data: any) => {
            this.messageList.push(
              new FormControl({ ...data['data'], sender: false })
            );
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  login(): void {
    if (!this.username.value) return;
    this.authService.setAuthState(true);
    this.userService.login(this.username.value);
  }

  sendMessage() {
    if (!this.message.value) return;
    const data = {
      username: this.username.value,
      message: this.message.value,
      date: moment().format(),
    };

    this.chatService.emitMessages(data);
    this.messageList.push(new FormControl({ ...data, sender: true }));
    this.message.setValue(null);
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
