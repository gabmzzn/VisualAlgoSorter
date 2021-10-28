import { Component } from '@angular/core'
import { MatSliderChange } from '@angular/material/slider'
import { AlgoService } from './app.service.algo'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private algoService: AlgoService) { }
  
  title = 'VisualAlgoSorter';
  sliderValue: any = 50;

  array: any = this.algoService.array
  arrayLength!: any

  ngOnInit() {
    this.changeArrayLength(this.sliderValue)
  }

  onInputChange(event: MatSliderChange) {
    this.sliderValue = event.value
    this.changeArrayLength(this.sliderValue)
  }

  changeArrayLength(n: number) {
    this.algoService.generateArray(n)
  }

  generateArray(n: number) {
    this.algoService.generateArray(n)
  }

  selectedAlgo: string = 'mergeSort'
  sort(value: string) {
    switch (value) {
      case 'quickSort':
        this.algoService.quickSort()
        break
      case 'mergeSort':
        this.algoService.mergeSort()
        break
      case 'heapSort':
        this.algoService.heapSort()
        break
      case 'bubbleSort':
        this.algoService.bubbleSort()
        break
    }
  }

  length(value: string, color: any) {
    return {
      height: value + 'px',
      width: Math.trunc(800 / this.algoService.arraySize) + 'px', 'background-color': color
    }
  }


}
