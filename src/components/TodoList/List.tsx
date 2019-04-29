import React, { useState, Component, createRef } from 'react';
import { Item } from './Item';
import styled from 'styled-components';

interface ITodoListState {
  name: string;
  count: number;
}

export class TodoList extends Component<{}, ITodoListState> {
  
  state = {
    name: 'Hello React! ',
    count: 0,
  }

  inputRef: React.RefObject<HTMLInputElement>;

  increase = () => {
    this.setState({
      count: this.state.count + 1,
      name: 'Hello React!' + this.state.count.toString(),
    })
  }

  // shouldComponentUpdate(nextProps: {}, nextState: ITodoListState) {
  //   return nextState.count !== this.state.count;
  // }

  inputHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(this.inputRef.current)
    if (this.inputRef.current) {
      this.setState({
        name: 'Hello React!' + this.inputRef.current.value,
      })
    }
    
  }

  constructor(props: {}) {
    super(props);
    this.inputRef = createRef();
  }

  render() {
    return <>
      <Input type="text" ref={this.inputRef} />
      <Button onClick={this.inputHandler}>确定</Button>
      <Button onClick={this.increase}>
        setCount {this.state.count}
      </Button>
      <Item name={this.state.name} />
    </>;
  }

}

const Button = styled.button`
  background-color: blue;
  border-radius: 3px;
  color: white;
  border: none;
  font-size: 16px;
  margin: 5px;
`
const Input = styled.input`
  border: 1px solid #ccc;
`