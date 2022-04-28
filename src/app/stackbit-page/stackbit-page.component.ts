import { Component, OnInit } from '@angular/core';
import exampleData from '../../../content/data/example.json';

@Component({
  selector: 'app-stackbit-page',
  templateUrl: './stackbit-page.component.html',
  styleUrls: ['./stackbit-page.component.css']
})
export class StackbitPageComponent implements OnInit {
  public example:{type:string, title:string} = exampleData;

  constructor() { }

  ngOnInit(): void {
  }
}
