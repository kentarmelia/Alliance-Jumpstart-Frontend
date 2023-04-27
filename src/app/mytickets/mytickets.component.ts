import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ModalComponent } from '../modal/modal.component';
import { environment } from 'src/environments/environment';
import { LoadingComponent } from '../loading/loading.component';
import axios from 'axios';
import { ComponentFactoryResolver, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import { SessionService } from '../session.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

interface File {
  name: string;
  date: string;
  size: string;
}
@Component({
  selector: 'app-mytickets',
  templateUrl: './mytickets.component.html',
  styleUrls: ['./mytickets.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.3s ease-in-out', style({ opacity: 0 }))
      ]),
      transition('* => *', [
        query('.file-item', [
          style({ opacity: 0 }),
          stagger(50, [
            animate('0.3s ease-in-out', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class MyticketsComponent implements OnInit {

  isLoading = false;
  
  constructor(
    private session:SessionService,
    private localstorage:LocalStorage,
    private router:Router,
    private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef
  ){

  }

  async ngOnInit() {
    this.isLoading=true;
    var isStart = false;
    await this.session.checkSession(isStart);
    this.isLoading =false;
  }

  @ViewChild('modalContent') modalContent!: TemplateRef<any>;

  modalRef:any;
  openAddTicketModal() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    this.modalRef = this.viewContainerRef.createComponent(factory);
    this.modalRef.instance.title = 'Confirm Add Ticket';
    this.modalRef.instance.modalContent = this.modalContent;
    this.modalRef.instance.confirmEvent.subscribe((result: boolean) => {
      this.modalRef.destroy();
      if (result) {
        console.log('Ticket added!');
      }
    });
  }

  onClose(){
    this.modalRef.instance.onClose();

  }



  isListView: boolean = false;
  isGridView: boolean = true;

  files: File[] = [
    {
      name: 'Document 1',
      date: '01/01/2022',
      size: '15 KB'
    },
    {
      name: 'Document 2',
      date: '02/01/2022',
      size: '25 KB'
    }
  ];

  toggleListView() {
    if (!this.isListView) {
      this.isListView = true;
      this.isGridView = false;
      this.animateListLayout();
    }
  }
  
  toggleGridView() {
    if (!this.isGridView) {
      this.isListView = false;
      this.isGridView = true;
      this.animateGridLayout();
    }
  }
  
  animateListLayout() {
    const items = document.querySelectorAll('.file-item');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('fade-in');
      }, index * 50);
    });
  }
  
  animateGridLayout() {
    const items = document.querySelectorAll('.file-item');
    items.forEach((item) => {
      item.classList.remove('fade-in');
    });
  }


  addTicket(){

  }

}
