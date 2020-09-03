import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  @Input() frameSize: string;

  brandLogoPath: string = '../../../assets/veneza_logo.png';

  constructor() { }

  ngOnInit(): void {
  }

}
