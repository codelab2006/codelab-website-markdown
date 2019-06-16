# React 事件处理
> author: Yongjian Huang
> tags: Java​Script, React

文章摘要
**********
```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAToggleOn: true, isBToggleOn: true, isCToggleOn: true };
  }

  handleAClick = (e) => {
    console.log(e);
    this.setState(state => ({ isAToggleOn: !state.isAToggleOn }));
  }

  handleBClick = v => e => {
    console.log(v, e);
    this.setState(state => ({ isBToggleOn: !state.isBToggleOn }));
  }

  handleCClick = (v, e) => {
    console.log(v, e);
    this.setState(state => ({ isCToggleOn: !state.isCToggleOn }));
  }

  render() {
    return (
      <div>
        <button onClick={this.handleAClick}>
          {this.state.isAToggleOn ? 'A ON' : 'A OFF'}
        </button>
        <button onClick={this.handleBClick('B')}>
          {this.state.isBToggleOn ? 'B ON' : 'B OFF'}
        </button>
        <button onClick={e => this.handleCClick('C', e)}>
          {this.state.isCToggleOn ? 'C ON' : 'C OFF'}
        </button>
      </div>
    );
  }
}
```
