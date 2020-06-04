import React from 'react'
import ReactDOM from 'react-dom'
import Select from 'react-select'
import Lyrid from 'lyrid-js-sdk-dev'
import { Form, TextArea } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class LyridTest extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      modules: [],
      revisions: [],
      functions: [],
      appId: '',
      moduleId: '',
      revisionId: '',
      functionId: '',
      inputs: '{"InputSample":"Hello"}',
      functionResponse: '',
    };
    this.lc = new Lyrid('RsliNzH8xQrdVIWJqOwd', 'bJq0YT7CRNKz4p0xh8rnQJB4VfYNwINEI3zlFJ67V25VGd8eXZ');
    this.getModules = this.getModules.bind(this);
    this.getRevisions = this.getRevisions.bind(this);
    this.getFunctions = this.getFunctions.bind(this);
    this.executeFunction = this.executeFunction.bind(this);
    this.selectFunction = this.selectFunction.bind(this);
    this.inputOnChange = this.inputOnChange.bind(this);
  }

  componentDidMount() {
    this.getApps();
  }

  getApps() {
    this.lc.getApps().then(data =>{
      console.log(data);
    }, () =>{
      const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ];
      this.setState({apps: options,});
    });
  }

  getModules(event) {
    const appId = event.value;
    this.lc.getModules(appId).then(data =>{
      console.log(data);
    }, () =>{
      const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ];
      this.setState({modules: options, appId: appId,});
    });
  }
  
  getRevisions(event) {
    const moduleId = event.value;
    this.lc.getRevisions(this.state.appId, moduleId).then(data =>{
      console.log(data);
    }, () =>{
      const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ];
      this.setState({revisions: options, moduleId: moduleId,});
    });
  }
  
  getFunctions(event) {
    const revisionsId = event.value;
    this.lc.getFunctions(this.state.appId, this.state.moduleId, revisionsId).then(data =>{
      console.log(data);
    }, () =>{
      const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ];
      this.setState({functions: options, revisionId: revisionsId,});
    });
  }
  
  selectFunction(event) {
    this.setState({functionId: event.value,});
    console.log(event);
  }
  
  executeFunction(event) {
    const input = JSON.stringify(this.state.inputs);
    this.lc.execute(this.state.functionId, "LYR", input).then(data =>{
      console.log(data);
    }, () =>{
      this.setState({functionResponse: "response from function execute",});
    });
  }
  
  inputOnChange(event) {
    this.setState({inputs: event.value});
  }

  render() {
    
    return (
        <div>
            <h1>Testing Lyrid JS SDK</h1>            
            <label>Select app:</label>
            <Select className="lyrid-select" options={this.state.apps} onChange={this.getModules}/>
            <label>Select module:</label>
            <Select className="lyrid-select" options={this.state.modules} onChange={this.getRevisions}/>
            <label>Select revision:</label>
            <Select className="lyrid-select" options={this.state.revisions} onChange={this.getFunctions}/>
            <label>Select function:</label>
            <Select className="lyrid-select" options={this.state.functions} onChange={this.selectFunction}/>
            <Form>
              <TextArea placeholder='enter function input' value={this.state.inputs} onChange={this.inputOnChange} style={{ width: 450, minHeight: 100, }}/>
              <div><Button basic color='purple' className="execute-btn" onClick={this.executeFunction}>Execute</Button></div>
              <TextArea placeholder='' value={this.state.functionResponse} style={{ width: 450, minHeight: 100, }}/>
            </Form>
        </div>
    );
  }
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }
  
  handleClick(i) {
    const squaresCopy = this.state.squares.slice();
    if (calculateWinner(squaresCopy) || squaresCopy[i]) {
      return;
    }
    squaresCopy[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({squares: squaresCopy, xIsNext: !this.state.xIsNext});
  }
  
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
      
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          {/*<Board />*/}
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
        <LyridTest />
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

