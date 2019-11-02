import React from 'react'
import ReactDOM from 'react-dom'
import './Visualizer.css'

const Items = (props) => {
  const { items, currentIndex } = props
  const maxValue = Math.max(...items)

  // max = 400px -> maxValue
  // height = item * maxHeight / maxValue

  const listItems = items.map((item, index) => (
    <div
      key={index}
      className="item"
      style={{
        paddingTop: (item * 400) / maxValue,
        backgroundColor: currentIndex + 1 === index ? 'red' : 'blue'
      }}
    >
      {item}
    </div>
  ))

  return listItems
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const pivot = async (array, start, end) => {
  const pivot = array[end]
  let index = start
  for (let i = start; i < end; i++) {
    if (array[i] < pivot) {
      const tmp = array[i]
      array[i] = array[index]
      array[index] = tmp

      index++
      await sleep(100)

      const elements = <Items items={array}></Items>
      ReactDOM.render(elements, document.getElementById('items'))
    }
  }
  const tmp = array[index]
  array[index] = array[end]
  array[end] = tmp

  await sleep(100)

  const elements = <Items items={array}></Items>
  ReactDOM.render(elements, document.getElementById('items'))

  return index
}

class Visualizer extends React.Component {
  constructor(props) {
    super(props)
    this.array = []
    this.generateRandomArray = this.generateRandomArray.bind(this)
    this.renderArray = this.renderArray.bind(this)
    this.bubbleSort = this.bubbleSort.bind(this)
    this.insertionStort = this.insertionStort.bind(this)
    this.selectionSort = this.selectionSort.bind(this)
    this.quickSort = this.quickSort.bind(this)
  }

  generateRandomArray() {
    const array = []
    const MIN = 10
    const MAX = 65
    const length = Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
    for (let i = 0; i < length; i++) {
      array.push(Math.floor(Math.random() * (MAX - MIN + 1) + MIN))
    }

    this.array = array
    this.renderArray()
  }

  renderArray() {
    const items = this.array
    const elements = <Items items={items}></Items>
    ReactDOM.render(elements, document.getElementById('items'))
  }

  async bubbleSort() {
    for (let i = 0; i < this.array.length; i++) {
      for (let j = 0; j < this.array.length; j++) {
        await sleep(100)
        if (this.array[j] > this.array[j + 1]) {
          const tmp = this.array[j]
          this.array[j] = this.array[j + 1]
          this.array[j + 1] = tmp
        }
        const elements = <Items items={this.array} currentIndex={j}></Items>
        ReactDOM.render(elements, document.getElementById('items'))
      }
    }

    console.log('DONE')
  }

  async insertionStort() {
    let i = 1
    while (i < this.array.length) {
      let j = i
      while (j > 0 && this.array[j - 1] > this.array[j]) {
        await sleep(100)
        const tmp = this.array[j]
        this.array[j] = this.array[j - 1]
        this.array[j - 1] = tmp
        j--

        const elements = <Items items={this.array}></Items>
        ReactDOM.render(elements, document.getElementById('items'))
      }
      i++
    }

    console.log('DONE')
  }

  async selectionSort() {
    for (let i = 0; i < this.array.length; i++) {
      let min = i
      for (let j = i + 1; j < this.array.length; j++) {
        if (this.array[min] > this.array[j]) {
          min = j
        }
      }
      if (min !== i) {
        await sleep(100)

        const tmp = this.array[i]
        this.array[i] = this.array[min]
        this.array[min] = tmp

        const elements = <Items items={this.array}></Items>
        ReactDOM.render(elements, document.getElementById('items'))
      }
    }
    console.log('DONE')
  }

  async quickSort(start, end, firstRun = true) {
    if (firstRun) {
      start = 0
      end = this.array.length - 1
    }

    if (start < end) {
      const pivots = await pivot(this.array, start, end)
      this.quickSort(start, pivots - 1, false)
      this.quickSort(pivots + 1, end, false)
    } else {
      console.log('DONE')
    }
  }

  render() {
    return (
      <div id="Visualizer" className="Visualizer">
        <button onClick={this.generateRandomArray}>Generate Array</button>
        <button onClick={this.bubbleSort}>Bubble Sort</button>
        <button onClick={this.insertionStort}>Insertion Sort</button>
        <button onClick={this.selectionSort}>Selection Sort</button>
        <button onClick={this.quickSort}>Quick Sort</button>
        <div id="items" className="items">
          {this.renderArray}
        </div>
      </div>
    )
  }
}

export default Visualizer
