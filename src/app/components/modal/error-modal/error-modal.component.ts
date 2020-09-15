import { Subscription } from 'rxjs';
import { ErrorService } from '../../../services/error.service';
import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit, OnDestroy {
  @ViewChild('openModal') openModalBtn: ElementRef;

  error: Error;
  errorSub: Subscription;

  @Input('msgTitle') msgTitle: string;
  @Input('msgBody') msgBody: string;
  @Input('msgBtnText') msgBtnText: string;

  constructor(private errorService: ErrorService) { }

  ngOnInit(): void {
    this.errorSub = this.errorService.errorSub.subscribe(newError => {
      this.error = newError;
      this.onOpenModal();
    })
  }

  onOpenModal() {
    this.openModalBtn.nativeElement.click();
  }

  onDismissError = () => this.errorService.dismissError();


  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
