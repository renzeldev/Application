import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-capabilities',
  templateUrl: './search-capabilities.component.html',
  styleUrls: ['./search-capabilities.component.scss']
})
export class SearchCapabilitiesComponent {
  @Input() searchDelay = 200;
  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  searchTimeoutId: number;
  search: string;

  constructor() { }

  handleInput() {
    if (typeof this.searchTimeoutId === 'number') {
      clearTimeout(this.searchTimeoutId)
    }

    this.searchTimeoutId = setTimeout(() => {
      this.onSearch.emit(this.search)
    }, this.searchDelay)
  }

}
