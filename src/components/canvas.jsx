import React, { Component } from "react";

class Canvas extends Component {
  state = {
    boundingClientRect: null,
    mousePressed: false,
    cx: -1,
    cy: -1,
    activeShapeIndex: -1,
    sourceShapeIndex: -1,
    shapes: []
  };

  constructor() {
    super();
    window.Canvas_render = this;
  }

  componentDidMount() {
    const shapes_copy = [...this.state.shapes];
    const myshape = document.createElement("text");
    myshape.setAttribute("id", "diagramLabel");
    myshape.setAttribute("x", 0);
    myshape.setAttribute("y", 10);
    myshape.setAttribute("fill", "black");
    myshape.setAttribute("onmouseup", "Canvas_render.diagramTextMouseUp(0)");
    myshape.innerHTML = "FullContext v1.0";
    shapes_copy.push(myshape);
    this.setState({
      boundingClientRect: document
        .getElementById("canvas")
        .getBoundingClientRect(),
      shapes: shapes_copy
    });
  }

  canvasMouseDown(e) {
    this.setState({
      mousePressed: true,
      cx: e.pageX - this.state.boundingClientRect.left,
      cy: e.pageY - this.state.boundingClientRect.top
    });
  }

  canvasMouseMove(e) {
    if (this.state.mousePressed) {
      const shapes_copy = [...this.state.shapes];
      const ex = e.pageX - this.state.boundingClientRect.left;
      let diffx = Math.abs(ex - this.state.cx);
      if (diffx > 0) {
        let myshape = null;
        let myshape2 = null;
        let myshape2_bg = null;
        let newActiveShapeIndex = -1;
        if (
          this.state.activeShapeIndex === -1 &&
          this.state.sourceShapeIndex === -1
        ) {
          myshape = document.createElement("circle");
          myshape.setAttribute("cx", this.state.cx);
          myshape.setAttribute("cy", this.state.cy);
          myshape.setAttribute("stroke", "black");
          myshape.setAttribute("fill", "transparent");
          myshape.setAttribute("stroke-width", 1.5);
          myshape.setAttribute(
            "onmousedown",
            "Canvas_render.diagramShapeMouseDown(" +
              (this.numLabledShapes() * 3 + 1) +
              ")"
          );
          shapes_copy.push(myshape);
          newActiveShapeIndex = this.numLabledShapes() * 3 + 1;
          myshape2_bg = document.createElement("rect");
          myshape2_bg.setAttribute(
            "style",
            "transform: translate(-" + 0.24 * 12 + "em, 0);"
          );
          myshape2_bg.setAttribute("width", 94);
          myshape2_bg.setAttribute("height", 20);
          myshape2_bg.setAttribute("fill", "grey");
          shapes_copy.push(myshape2_bg);
          myshape2 = document.createElement("text");
          let newValue = "System0" + this.numLabledShapes() + ".00";
          const newValueWidth = this.getTextWidth(newValue);
          myshape2.setAttribute(
            "style",
            "transform: translate(-" + (newValueWidth / 2 - 5.5) + "px, 0);"
          );
          myshape2.setAttribute("fill", "white");
          myshape2.setAttribute(
            "onmouseup",
            "Canvas_render.diagramTextMouseUp(" +
              (this.numLabledShapes() * 3 + 3) +
              ")"
          );
          myshape2.setAttribute(
            "value",
            "System0" + this.numLabledShapes() + ".00"
          );
          myshape2.innerHTML = newValue;
          shapes_copy.push(myshape2);
        } else {
          if (this.state.sourceShapeIndex === -1) {
            myshape = shapes_copy[this.state.activeShapeIndex];
            myshape2_bg = shapes_copy[this.state.activeShapeIndex + 1];
            myshape2 = shapes_copy[this.state.activeShapeIndex + 2];
            newActiveShapeIndex = this.state.activeShapeIndex;
          } else {
            myshape = shapes_copy[this.state.sourceShapeIndex];
            myshape2_bg = shapes_copy[this.state.sourceShapeIndex + 1];
            myshape2 = shapes_copy[this.state.sourceShapeIndex + 2];
            diffx =
              //parseInt(myshape.getAttribute("radius")) +
              Math.abs(ex - parseInt(myshape.getAttribute("cx"))); // / 2;
            document.getElementById("diagramLabel").innerHTML = diffx;
          }
        }
        myshape.setAttribute("r", diffx);
        myshape2.setAttribute(
          "x",
          parseInt(myshape.getAttribute("cx")) - Math.sin(Math.PI / 4) * diffx
        );
        myshape2.setAttribute(
          "y",
          parseInt(myshape.getAttribute("cy")) - Math.sin(Math.PI / 4) * diffx
        );
        myshape2_bg.setAttribute(
          "x",
          parseInt(myshape.getAttribute("cx")) -
            Math.sin(Math.PI / 4) * diffx -
            3
        );
        myshape2_bg.setAttribute(
          "y",
          parseInt(myshape.getAttribute("cy")) -
            Math.sin(Math.PI / 4) * diffx -
            14
        );
        this.setState({
          activeShapeIndex: newActiveShapeIndex,
          shapes: shapes_copy
        });
      }
    }
  }

  numLabledShapes() {
    return (this.state.shapes.length - 1) / 3;
  }

  canvasMouseUp(e) {
    /* could store value like this...
    const shapes_copy = [...this.state.shapes];
    if (this.state.activeShapeIndex !== -1) {
      shapes_copy[this.state.activeShapeIndex].setAttribute(
        "radius",
        shapes_copy[this.state.activeShapeIndex].getAttribute("r")
      );
    } else if (this.state.sourceShapeIndex !== -1) {
      shapes_copy[this.state.sourceShapeIndex].setAttribute(
        "radius",
        shapes_copy[this.state.sourceShapeIndex].getAttribute("r")
      );
    }
    */
    this.setState({
      mousePressed: false,
      cx: -1,
      cy: -1,
      activeShapeIndex: -1,
      sourceShapeIndex: -1 //,
      //shapes: shapes_copy
    });
  }

  diagramTextMouseUp(shapeIndex) {
    const shapes_copy = [...this.state.shapes];
    let newValue =
      prompt(
        "Edit property:",
        this.state.shapes[shapeIndex].getAttribute("value")
      ) || this.state.shapes[shapeIndex].innerHTML;
    shapes_copy[shapeIndex].setAttribute("value", newValue);
    if (newValue.length > 11) {
      newValue = newValue.substr(0, 11) + "...";
      const newValueWidth = this.getTextWidth(newValue);
      shapes_copy[shapeIndex - 1].setAttribute(
        "style",
        "transform: translate(-" + 0.24 * 12 + "em, 0);"
      );
      shapes_copy[shapeIndex].setAttribute(
        "style",
        "transform: translate(-" + (newValueWidth / 2 - 5.5) + "px, 0);"
      );
    } else {
      const newValueWidth = this.getTextWidth(newValue);
      shapes_copy[shapeIndex - 1].setAttribute(
        "style",
        "transform: translate(-" + 0.24 * 12 + "em, 0);"
      );
      shapes_copy[shapeIndex].setAttribute(
        "style",
        "transform: translate(-" + (newValueWidth / 2 - 5.5) + "px, 0);"
      );
    }
    shapes_copy[shapeIndex].innerHTML = newValue;
    this.setState({
      mousePressed: false,
      cx: -1,
      cy: -1,
      activeShapeIndex: -1,
      shapes: shapes_copy
    });
  }

  diagramShapeMouseDown(shapeIndex) {
    this.setState({
      mousePressed: true,
      cx: window.event.pageX - this.state.boundingClientRect.left,
      cy: window.event.pageY - this.state.boundingClientRect.top,
      activeShapeIndex: -1,
      sourceShapeIndex: shapeIndex
    });
  }

  getTextWidth(text) {
    let canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = "small sans-serif";
    const textWidth = ctx.measureText(text).width;
    canvas = null;
    return textWidth;
  }

  render() {
    return (
      <div
        id="canvas"
        className="Canvas"
        onMouseDown={(e) => this.canvasMouseDown(e)}
        onMouseMove={(e) => this.canvasMouseMove(e)}
        onMouseUp={(e) => this.canvasMouseUp(e)}
      >
        <svg
          width="100%"
          height="100%"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{
            __html: this.state.shapes.map((shape) => shape.outerHTML)
          }}
        ></svg>
        {this.state.shapes.map((shape) => shape.outerHTML)}
      </div>
    );
  }
}

export default Canvas;
