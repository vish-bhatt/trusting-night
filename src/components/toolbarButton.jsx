import React, { Component } from "react";

class ToolbarButton extends Component {
  /* controlled component
  state = {
    btnId: this.props.btnId,
    btnSym: this.props.btnSym,
    btnOn: this.props.btnOn
  };
  */

  /* considered options for getting state...
  constructor() {
    super();
    this.state.buttonData = this.props.buttonData;
  }
  */

  getClassNames() {
    let myClassNames = "ToolbarButton";
    if (this.props.btnOn) {
      myClassNames += " ToolbarButtonMouseUp";
    }
    return myClassNames;
  }

  addClassMouseDown(e) {
    if (this.props.btnOn) {
      e.target.classList.add("ToolbarButtonOnMouseDown");
    } else {
      e.target.classList.add("ToolbarButtonMouseDown");
    }
  }

  toggleClassMouseUp(e) {
    if (this.props.btnOn) {
      e.target.classList.remove("ToolbarButtonOnMouseDown");
      e.target.classList.remove("ToolbarButtonMouseUp");
      e.target.classList.remove("ToolbarButtonMouseDown");
    } else {
      e.target.classList.add("ToolbarButtonMouseUp");
    }
    /*
    this.setState({
      btnOn: !this.state.btnOn
    });
    */
  }

  clearClassMouseDown(e) {
    e.target.classList.remove("ToolbarButtonOnMouseDown");
    e.target.classList.remove("ToolbarButtonMouseDown");
  }

  render() {
    return (
      <div
        className={this.getClassNames()}
        onMouseDown={(e) => this.addClassMouseDown(e)}
        onMouseUp={(e) => this.toggleClassMouseUp(e)}
        onMouseLeave={(e) => this.clearClassMouseDown(e)}
        onClick={() => this.props.onClick(this.props.btnId)}
      >
        {this.props.btnSym}
      </div>
    );
  }
}

export default ToolbarButton;
