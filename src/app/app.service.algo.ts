import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AlgoService {
  array = new BehaviorSubject(0);
  arraySize!: number;

  generateArray(n: any) {
    this.arraySize = n
    const array: any = new Array(n).fill(0).map(() => {
      return {value: Math.ceil(Math.random() * 700), color: 'cadetblue'};
    });
    this.array.next(array);
  }

  showChange(change: any[]) {
    const arr: any = this.array.getValue()
    if (!change.length) {
      arr.forEach((el: { color: string }) => {
        el.color = 'rebeccapurple'
      })
      return
    }
    const subChange = change.shift()
    subChange.forEach((el: { index: string | number; value: any; color: any }) => {
      arr[el.index].value = el.value
      arr[el.index].color = el.color
    })
    setTimeout(() => this.showChange(change), 700 / this.arraySize) // set speed as function of array length
  }

  quickSort() {
    const change: any[] = []
    console.log(this.array.getValue())
    const arr: any = JSON.parse(JSON.stringify(this.array.getValue())) // avoid shallow copy of behaviorSubject value
    quickSortAlgo(arr, 0, arr.length - 1)

    function quickSortAlgo(array: any[], start: number, end: number) {
      if (start >= end) {
        const sorted = []
        for (; end <= start && end < array.length; end++) {
          if (end < 0) {
            continue
          }
          sorted.push({
            index: end, value: array[end].value, color: 'rebeccapurple'
          })
        }
        change.push(sorted)
        return
      }

      const pivot = start
      let left = start + 1
      let right = end
      change.push([
        { index: start, value: array[start].value, color: 'yellow' },
        { index: start + 1, value: array[start + 1].value, color: 'lime' },
        { index: end, value: array[end].value, color: 'lime' }
      ])

      while (right >= left) {
        if (array[right].value < array[pivot].value && array[left].value > array[pivot].value) {
          change.push([
            { index: right, value: array[right].value, color: 'crimson' },
            { index: left, value: array[left].value, color: 'crimson' },
          ],
            [
              { index: right, value: array[left].value, color: 'crimson' },
              { index: left, value: array[right].value, color: 'crimson' },
            ],
            [
              { index: right, value: array[left].value, color: 'lime' },
              { index: left, value: array[right].value, color: 'lime' },
            ])
          const temp = array[right]
          array[right] = array[left]
          array[left] = temp
        }

        if (array[right].value >= array[pivot].value) {
          if (right - 1 >= left) {
            change.push([
              { index: right, value: array[right].value, color: 'cadetblue' },
              { index: right - 1, value: array[right - 1].value, color: 'lime' },
            ])
          } else {
            change.push([
              { index: right, value: array[right].value, color: 'cadetblue' },
            ])
          }
          right--
        }

        if (array[left].value <= array[pivot].value) {
          if (right >= left + 1) {
            change.push([
              { index: left, value: array[left].value, color: 'cadetblue' },
              { index: left + 1, value: array[left + 1].value, color: 'lime' },
            ])
          } else {
            if (pivot !== right) {

            } else {
              change.push([
                { index: left, value: array[left].value, color: 'cadetblue' },
              ])
            }
          }
          left++
        }

      }

      if (pivot !== right) {
        change.push(
          [
            { index: right, value: array[right].value, color: 'crimson' },
            { index: pivot, value: array[pivot].value, color: 'crimson' },
          ],
          [
            { index: right, value: array[pivot].value, color: 'crimson' },
            { index: pivot, value: array[right].value, color: 'crimson' },
          ],
          [
            { index: right, value: array[pivot].value, color: 'rebeccapurple' },
            { index: pivot, value: array[right].value, color: 'cadetblue' },
          ])
        const temp = array[right]
        array[right] = array[pivot]
        array[pivot] = temp
      } else {
        change.push([
          { index: right, value: array[right].value, color: 'rebeccapurple' },
          { index: pivot, value: array[pivot].value, color: 'rebeccapurple' },
        ])
      }

      quickSortAlgo(array, start, right - 1)
      quickSortAlgo(array, right + 1, end)
    }

    this.showChange(change)
  }

  mergeSort() {
    const arr = JSON.parse(JSON.stringify(this.array.getValue())).map((x: { index: any }, i: any) => {
      x.index = i;
      return x;
    });
    const change: any[] = [];
    mergeSortHelper(arr, 0, arr.length);
    this.showChange(change);

    function mergeSortHelper(array: any[],  start: number, end: number) {
      if (array.length === 1) {
        return array;
      }
      const half = Math.floor(array.length / 2);
      const first = array.slice(0, half);
      const second = array.slice(half);

      const indexHalf = Math.floor((end + 1 + start) / 2);
      const actualFirst = mergeSortHelper(first, start, indexHalf - 1);
      const actualSecond = mergeSortHelper(second, indexHalf, end);

      let isFinalMerge = false;
      if (actualFirst.length + actualSecond.length === arr.length) { isFinalMerge = true; }

      const acturez = actualSort(actualFirst, actualSecond, isFinalMerge);
      return acturez;
    }

    function actualSort(first: any[], second: any[], isFinalMerge: boolean) {
      const sortedArray: any[] = [];
      let smallIdx = first[0].index;
      first.map(x => {
        smallIdx = x.index < smallIdx ? x.index : smallIdx;
      });
      first[0].color = 'lime';
      second[0].color = 'lime';
      change.push(sortIndex(smallIdx, sortedArray, first, second));
      while (first.length && second.length) {
        if (first[0].value <= second[0].value) {
          sortedArray.push(first.shift());
        } else {
          first[0].color = 'crimson';
          second[0].color = 'crimson';
          change.push(sortIndex(smallIdx, sortedArray, first, second));

          sortedArray.push(second.shift());

          sortedArray[sortedArray.length - 1].color = 'lime';
          first[0].color = 'lime';
          change.push(sortIndex(smallIdx, sortedArray, first, second));
        }

        if (isFinalMerge) {
          sortedArray[sortedArray.length - 1].color = 'rebeccapurple';
        } else {
          sortedArray.map(x => {
            x.color = 'cadetblue';
            return x;
          });
        }
        first.map(x => {
          x.color = 'cadetblue';
          return x;
        });
        second.map((x: { color: string }) => {
          x.color = 'cadetblue';
          return x;
        });

        if (first.length && second.length) {
          first[0].color = 'lime';
          second[0].color = 'lime';
        } else if (isFinalMerge) {
          if (first.length) {first[0].color = 'rebeccapurple'; }
          if (second.length) {second[0].color = 'rebeccapurple'; }
        }

        change.push(sortIndex(smallIdx, sortedArray, first, second));
      }
      return sortedArray.concat(first).concat(second);
    }

    function sortIndex(index: number, sortedArray: any[], first: any[], second: string | any[]) {
      const tempArray = JSON.parse(JSON.stringify(sortedArray.concat(first).concat(second))); // avoid shallow copy
      tempArray.map((x: { index: number }) => {
        x.index = index;
        index++;
        return x;
      });
      return tempArray;
    }
  }

  heapSort() {
    const array:any = JSON.parse(JSON.stringify(this.array.getValue())); // avoid shallow copy of behaviorSubject value
    const change = [];
    let lastLeft: any;
    let lastRight: number | null = null;
    let lastStart: string | number | null = null;
    let lastHighlited = null;
    buildMaxHeap(array);
    let end = array.length - 1;
    while (end > 0) {
      if (lastHighlited != null) {
        change.push(lastHighlited);
        lastHighlited = null;
      }
      change.push(
        [
          {index: end, value: array[end].value, color: 'lime'},
          {index: 0, value: array[0].value, color: 'lime'}
        ],
        [
          {index: end, value: array[end].value, color: 'crimson'},
          {index: 0, value: array[0].value, color: 'crimson'}
        ],
        [
          {index: end, value: array[0].value, color: 'crimson'},
          {index: 0, value: array[end].value, color: 'crimson'}
        ],
        [
          {index: end, value: array[0].value, color: 'lime'},
          {index: 0, value: array[end].value, color: 'lime'}
        ],
        [
          {index: end, value: array[0].value, color: 'rebeccapurple'}
        ]
      );

      const temp = array[end];
      array[end] = array[0];
      array[0] = temp;
      lastLeft = null;
      lastRight = null;
      lastStart = null;
      siftDown(array, 0, end);
      end--;
    }
    this.showChange(change);

    function buildMaxHeap(arr: any[]) {
      let currentIndex = Math.floor(arr.length / 2);
      while (currentIndex >= 0) {
        siftDown(arr, currentIndex, arr.length);
        currentIndex--;
      }
    }
    function siftDown(arr: any[], start: number, e: number) {
      const toChange = [];
      if (lastRight != null) {
        toChange.push(
          {index: lastLeft, value: array[lastLeft].value, color: 'cadetblue'},
          {index: lastRight, value: array[lastRight].value, color: 'cadetblue'}
        );
      } else if (lastLeft != null) {
        toChange.push(
          {index: lastLeft, value: array[lastLeft].value, color: 'cadetblue'},
        );
      }

      if (lastStart != null) {
        toChange.push(
          {index: lastStart, value: array[lastStart].value, color: 'cadetblue'},
        );
      }

      if (start >= Math.floor(e / 2)) {
        lastHighlited = toChange;
        return;
      }
      const left = start * 2 + 1;
      const right = start * 2 + 2 < e ? start * 2 + 2 : null;
      let swap;

      if (right) {
        lastLeft = left;
        lastRight = right;
        toChange.push(
          {index: start, value: array[start].value, color: 'lime'},
          {index: left, value: array[left].value, color: 'lime'},
          {index: right, value: array[right].value, color: 'lime'}
        );
        swap = arr[left].value > arr[right].value ? left : right;
      } else {
        lastLeft = left;
        lastRight = null;
        toChange.push(
          {index: start, value: array[start].value, color: 'lime'},
          {index: left, value: array[left].value, color: 'lime'},
        );
        swap = left;
      }

      change.push(toChange);
      lastStart = start;

      if (arr[start].value < arr[swap].value) {
        change.push(
          [
            {index: start, value: array[start].value, color: 'crimson'},
            {index: swap, value: array[swap].value, color: 'crimson'}
          ],
          [
            {index: start, value: array[swap].value, color: 'crimson'},
            {index: swap, value: array[start].value, color: 'crimson'}
          ],
          [
            {index: start, value: array[swap].value, color: 'lime'},
            {index: swap, value: array[start].value, color: 'lime'}
          ],
        );
        const temp = arr[swap];
        arr[swap] = arr[start];
        arr[start] = temp;
        siftDown(arr, swap, e);
      }
    }
  }

  bubbleSort() {
    const array: any = JSON.parse(JSON.stringify(this.array.getValue())); // avoid shallow copy of behaviorSubject value
    const change = [];
    let sorted = false;
    let round = 0;
    while (!sorted) {
      sorted = true;
      for (let i = 0; i < array.length - 1 - round; i++) {
        if (i > 0) {
          change.push([
            {index: i - 1, value: array[i - 1].value, color: 'cadetblue'},
            {index: i, value: array[i].value, color: 'lime'},
            {index: i + 1, value: array[i + 1].value, color: 'lime'}
          ]);
        } else {
          change.push([
            {index: i, value: array[i].value, color: 'lime'},
            {index: i + 1, value: array[i + 1].value, color: 'lime'}
          ]);
        }
        if (array[i].value > array[i + 1].value) {
          sorted = false;
          change.push([
            {index: i, value: array[i].value, color: 'crimson'},
            {index: i + 1, value: array[i + 1].value, color: 'crimson'}
          ]);
          const temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;
          change.push([
            {index: i, value: array[i + 1].value, color: 'crimson'},
            {index: i + 1, value: array[i].value, color: 'crimson'}
          ]);
        }
        change.push([
          {index: i, value: array[i].value, color: 'lime'},
          {index: i + 1, value: array[i + 1].value, color: 'lime'}
        ]);
      }
      round++;
      change.push([
        {index: array.length - round, value: array[array.length - round].value, color: 'rebeccapurple'},
        {index: array.length - round - 1, value: array[array.length - round - 1].value, color: 'cadetblue'}
      ]);
    }
    this.showChange(change);
  }

}
