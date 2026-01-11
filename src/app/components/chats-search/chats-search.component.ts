import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { MainServiceService } from '../../main-service/main/main-service.service';

@Component({
  selector: 'app-chats-search',
  templateUrl: './chats-search.component.html',
  styleUrls: ['./chats-search.component.scss'],
})
export class ChatsSearchComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  list: User[] = [];
  list_following: User[] = [];
  list_pending_sent: User[] = [];

  userMap = new Map<number, 'follow' | 'unfollow' | 'acfollow'>();

  Name: any;

  constructor(
    private platform: Platform,
    private router: Router,
    private service: MainServiceService
  ) {}

  ngOnInit(): void {
    this.platform.ready().then(() => {
      document.documentElement.style.setProperty(
        '--screen-h',
        `${this.platform.height()}px`
      );
    });
  }

  /* ================= SEARCH ================= */

  search(event: any) {
    const value = event.target.value;

    this.service.search(value).subscribe(
      (data: User[]) => {
        this.list = data;
        this.loadStatuses();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  /* ================= LOAD FOLLOW STATUS ================= */

  loadStatuses() {
    this.service.following('').subscribe((data: User[]) => {
      this.list_following = data;
      this.buildUserMap();
    });

    this.service.pending_sent('').subscribe((data: User[]) => {
      this.list_pending_sent = data;
      this.buildUserMap();
    });
  }

  buildUserMap() {
    this.list.forEach(user => {
      if (this.list_pending_sent.some(p => p.id === user.id)) {
        this.userMap.set(user.id, 'acfollow');
      } else if (this.list_following.some(f => f.id === user.id)) {
        this.userMap.set(user.id, 'unfollow');
      } else {
        this.userMap.set(user.id, 'follow');
      }
    });
  }

  /* ================= CLICK ================= */

  click(id: number) {
    const status = this.userMap.get(id);

    if (status === 'follow') {
      this.userMap.set(id, 'acfollow');
      this.follow(id);
    }

    if (status === 'unfollow') {
      this.userMap.set(id, 'follow');
      this.unfollow(id);
    }
  }

  /* ================= API ================= */

  follow(id: number) {
    this.service.follow({
      userId: 2601042138368739,
      targetUserId: id
    }).subscribe();
  }

  unfollow(id: number) {
    this.service.unfollow({
      userId: 2601042138368739,
      targetUserId: id
    }).subscribe();
  }

  /* ================= TEMPLATE HELPERS ================= */

  style(id: number) {
    const status = this.userMap.get(id);

    return status === 'unfollow'
      ? 'circular-btn-uf'
      : 'circular-btn-f';
  }

  trackByFn(_: number, item: User) {
    return item.id;
  }

  /* ================= UI ================= */

  ngAfterViewInit() {
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 300);
  }

  goBack() {
    this.router.navigate(['/home-page']);
  }
}
export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
  onlineStatus: 'ONLINE' | 'OFFLINE';
  lastActiveAt: string | null;
  followStatus: string | null;
  isMutualFollow: boolean;
}
