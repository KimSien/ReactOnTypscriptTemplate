import * as React from "react";
import * as ReactDOM from "react-dom";


interface BaseProps { }
interface BaseStete { }

/*
class BaseApp extends React.Component<BaseProps, BaseStete>{

    render() {
        return (
            <p>
                test app
            </p>
        )
    }
}
*/

const style = {
    border: '1px solid gray',
    backgroundColor: 'white',
  };
  
  interface STATES{
    drawing :any
  }
class Canvas extends  React.Component<BaseProps, BaseStete>{

    private canvas :any;
  
    public state: STATES;
  
    componentDidMount(){
      this.canvas = React.createRef();
  
      this.setState({
        drawing: false
      });

    }
    
    getContext() {
      return this.canvas.getContext('2d');
    }
  
    startDrawing(x :any, y :any) {
      this.setState({ drawing: true });
      const ctx = this.getContext();
      ctx.moveTo(x, y);

      //const ctx = this.getContext();
      ctx.fillRect(10, 10, 100, 100);
    }
  
    draw(x :any, y :any) {
      if(!this.state.drawing){
        return;
      }
      const ctx = this.getContext();
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  
    endDrawing() {
      this.setState({ drawing: false });
    }
    
    //var canvas = <HTMLCanvasElement> document.getElementById('lineChartCanvas');
    //var ctx = canvas.getContext("2d");
  
    render() {
      return (
        <canvas
          ref ={(self) => { this.canvas = self; }}
          width="500px"
          height="500px"
          onMouseDown={e => this.startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
          onMouseUp={() => this.endDrawing()}
          onMouseLeave={() => this.endDrawing()}
          onMouseMove={e => this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
          style={style}
        />
      );
    }

}

ReactDOM.render(
    <Canvas />
    ,
    document.getElementById('app')
)
