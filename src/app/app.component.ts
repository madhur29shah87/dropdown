import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'searchDD';
  queryField: FormControl = new FormControl();

  dataArray = [
    {
      "id": "123-s2-546",
      "name": "John Jacobs",
      "items": ["bucket", "bottle"],
      "address": "1st Cross, 9th Main, abc Apartment",
      "pincode": "5xx012"
    },
    {
      "id": "123-s3-146",
      "name": "David Mire",
      "items": ["Bedroom Set"],
      "address": "2nd Cross, BTI Apartment",
      "pincode": "4xx012"
    },
    {
      "id": "223-a1-234",
      "name": "Soloman Marshall",
      "items": ["bottle"],
      "address": "Riverbed Apartment",
      "pincode": "4xx032"
    },
    {
      "id": "121-s2-111",
      "name": "Ricky Beno",
      "items": ["Mobile Set"],
      "address": "Sunshine City",
      "pincode": "5xx072"
    },
    {
      "id": "123-p2-246",
      "name": "Sikander Singh",
      "items": ["Air Conditioner"],
      "address": "Riverbed Apartment",
      "pincode": "4xx032"
    },
    {
      "id": "b23-s2-321",
      "name": "Ross Wheeler",
      "items": ["Mobile"],
      "address": "1st Cross, 9th Main, abc Apartement",
      "pincode": "5xx012"
    },
    {
      "id": "113-n2-563",
      "name": "Ben Bish",
      "items": ["Kitchen Set", "Chair"],
      "address": "Sunshine City",
      "pincode": "5xx072"
    },
    {
      "id": "323-s2-112",
      "name": "John Michael",
      "items": ["Refrigerator"],
      "address": "1st Cross, 9th Main, abc Apartement",
      "pincode": "5xx012"
    },
    {
      "id": "abc-34-122",
      "name": "Jason Jordan",
      "items": ["Mobile"],
      "address": "Riverbed Apartment",
      "pincode": "4xx032"
    }
  ];

  public model: any;

  itemId: string = "";
  initialIndex = 0;
  enableKeyboard = false;
  enableHover = false;

  searchResult = [];

  constructor() {
    // Keyboard event listener to track up and down keys
    document.addEventListener('keydown', function focusDD(event: any) {
      let hoverElement = document.querySelector('.mouse-hover');
      if (event.keyCode == 40 && this.initialIndex < this.searchResult.length - 1) {
        // removed mouse hover style with keyboard up/down is triggered
        if (hoverElement) {
          hoverElement.classList.remove('mouse-hover');
        }
        ++this.initialIndex
        this.enableKeyboard = true;
      } else if (event.keyCode == 38 && this.initialIndex > 0) {
        // removed mouse hover style with keyboard up/down is triggered
        if (hoverElement) {
          hoverElement.classList.remove('mouse-hover');
        }
        this.enableKeyboard = true;
        --this.initialIndex;
      }
    }.bind(this));
  }

  ngOnInit() {
    this.queryField.valueChanges.pipe(debounceTime(200), distinctUntilChanged()).subscribe(result => this.searchData(result));
  }

  searchData(result: string) {
    if (result) {
      let data = this.dataArray.filter(e => e.name.toLowerCase().includes(result.toLowerCase()));
      debugger;
      if(data.length == 0 || !data.filter(e => e.address.includes(result))){
        data = this.dataArray.filter(e => e.address.toLowerCase().includes(result.toLowerCase()));
      }
      if(data.length == 0 || !data.filter(e => e.id.includes(result))){
        data = this.dataArray.filter(e => e.id.toLowerCase().includes(result.toLowerCase()));
      }
      if (data && data.length > 0) {
        this.searchResult = data;
      } else {
        this.searchResult = [];
      }
    } else {
      this.searchResult = [];
    }
  }

  mouseEnter(item) {
    this.enableKeyboard = false;
    this.initialIndex = item;
    this.enableHover = true;
    // debugger;
    event.currentTarget.classList.add('mouse-hover')
    // document.querySelector('.mouse-hover');
  }
}
