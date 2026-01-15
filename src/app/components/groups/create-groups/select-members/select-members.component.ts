import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-members',
  templateUrl: './select-members.component.html',
  styleUrls: ['./select-members.component.scss'],
})
export class SelectMembersComponent {
 list = [
    { id: 1, name: 'John Smith', selected: false, isAdmin: false },
    { id: 2, name: 'Jane Doe', selected: false, isAdmin: false },
    { id: 3, name: 'Alex Brown', selected: false, isAdmin: false },
  ];

  // Toggle اختيار عضو (multi-select)
  toggleSelectMember(member: any) {
    member.selected = !member.selected;
  }

  // Toggle مشرف (multi-admin)
  toggleAdmin(member: any) {
    member.isAdmin = !member.isAdmin;
  }

  // تحقق إذا يجب تفعيل الزر
  get canCreateGroup(): boolean {
    return this.list.some(m => m.selected || m.isAdmin);
  }

  // إنشاء المجموعة
  createGroup() {
    const members = this.list.filter(m => m.selected);
    const admins = this.list.filter(m => m.isAdmin);

    console.log('Selected members:', members);
    console.log('Admins:', admins);

    // هنا ممكن إضافة منطق إرسال البيانات إلى السيرفر
  }

}
 