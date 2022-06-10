import React, { Component } from "react";
import ToolbarButton from "./toolbarButton"; //controlled component

class Toolbar extends Component {
  state = {
    lastBtnOn: -1,
    buttons: [
      { btnId: 0, btnSym: "🞅", btnOn: false },
      { btnId: 1, btnSym: "☐", btnOn: false },
      { btnId: 2, btnSym: "▢", btnOn: false },
      { btnId: 3, btnSym: "⚯", btnOn: false },
      { btnId: 4, btnSym: "→", btnOn: false },
      { btnId: 5, btnSym: "↔", btnOn: false },
      { btnId: 6, btnSym: "⭯", btnOn: false },
      { btnId: 7, btnSym: "A", btnOn: false },
      { btnId: 8, btnSym: "🠝", btnOn: false },
      { btnId: 9, btnSym: "🤏", btnOn: false }
    ]
  };

  handleButtonClick = (btnId) => {
    const buttons_copy = [...this.state.buttons];
    if (btnId !== this.state.lastBtnOn) {
      if (this.state.lastBtnOn > -1) {
        buttons_copy[this.state.lastBtnOn].btnOn = false;
      }
      buttons_copy[btnId].btnOn = true;
    } else {
      buttons_copy[btnId].btnOn = !buttons_copy[btnId].btnOn;
    }
    this.setState({
      lastBtnOn: btnId,
      buttons: buttons_copy
    });
  };

  render() {
    return (
      <div>
        {this.state.buttons.map((btn) => (
          <ToolbarButton
            btnId={btn.btnId}
            btnSym={btn.btnSym}
            btnOn={btn.btnOn}
            onClick={this.handleButtonClick}
          />
        ))}
      </div>
    );
  }
}

export default Toolbar;
