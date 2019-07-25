/**
 * 1-1 set react
 */
import * as React from "react";
import * as ReactDom from "react-dom";

/**
 * 1-3-2 import react-redux
 * 
 * using connect state of App to APPcomponent
 * 
 */
import { Provider, connect } from "react-redux";

/**
 * 2-1 set redux
 * 
 */
import { createStore, applyMiddleware } from "redux";

/**
 * 3-1 set redux-saga
 */
import createSagaMiddleware from 'redux-saga';
import { select, call, put, takeEvery, takeLatest, delay, all } from 'redux-saga/effects';


/**
 * 
 * 3-2 setting base Mysaga func
 * 
 * @param url 
 * 
 * 
 */
function* AjaxGetPost(url: any) {
  /**
   * ajax func
   */

  const returnValue: any = [];
  yield put({ type: "ajax_get_post", returnValue });
}
function* TestClick(v: any){
  yield put({type:"test",volume:v})
}

/**
 * 
 * 3-2 setting Mysaga
 * 
 */
function* MySaga() {
  yield all([
    takeLatest("Ajax_Get_Post", AjaxGetPost),
    takeLatest("Test_Click",TestClick)
  ]);
}



/**
 * -----------------------------------------------------------------------------
 */

/**
 * 1-2 set AppComponent
 */
/* interface Aprops {
  Test_Click :any;
}
*/

interface Astate { 
  pr: any;
 }

class AppComponent extends React.Component<any,Astate>{

  state :Astate ={
    pr : ""
  }

  componentWillReceiveProps(){
    console.log(this.state);   
    console.log(this.props.test);

    this.setState({
      pr : this.props.test
    });
     
  }

  /**
   * 
   * redux only
    <input type="button" onClick={()=>{this.props.Test_Click("test")}} defaultValue="click" />
   * 
   * saga only
    <input type="button" onClick={ ()=>{ this.props.dispatch({type:"Test_Click",a:"test"}) } } defaultValue="click" />   
   * 
   */
  public render() {

    return (
      <div>
      <p>test state is {this.state.pr}</p>
      <p>test saga state to prop is {this.props.test}</p>
      <input type="button" onClick={ ()=>{ this.props.dispatch({type:"Test_Click", test:"test2"}) } } defaultValue="click" />
      </div>
    );
  }
}

/**
 * 1-3 set App
 */
const App: any = (() => {
  /**
   * 
   * 1-3-1 set mapStatetoProps
   * 
   * @param state 
   */
  
  const mapStatetoProps = (state: any) => {
    return {...state };
    
    /*
    return [...state,{
      test: ""
    }]
    */
    
   /*
   return {
     test: ""
   }
   */
    
  }
  

  /* redux only */
  /**
   * 
   * 1-3-2
   * 
   * dispatch action
   * 
   */
  /*
  const mapDispatchToProps = (dispatch :any)=>{
    return {
      Test_Click: (a :any)=>{
        dispatch({type: 'test', a })
      }
    }
  }
  */

  /* redux only */
  /**
   * 
   * 1-3-2
   * return connect, prepare import {connect} from react-redux
   * 
   */
  /* 
  return connect(
    mapStatetoProps,
    mapDispatchToProps
  )(AppComponent);
  */


  /**
   * 3-3 saga only
   * 
   * 
   * 
   */
  return connect(mapStatetoProps)(AppComponent);
})();
/**
 * -----------------------------------------------------------------------------
 */


const initialState = {
  test : "start",
}
/**
 * 
 * 2-2 redux
 * 
 * reducer
 * 
 * @param state 
 * @param action 
 */
function reducer(state:any=[],action:any){
  switch (action.type) {
    case "ajaxgetpost":

      /**
       * state controle
       * 
       */
      
      break;
    case "test":
      //console.log(action);
      //console.log("test");

      /*
      return Object.assign({}, state, {
        "test" : action.volume.test
      });
      */
      return {...state, "test" : action.volume.test} 
      break;
      
    default:
      return state;
      break;
  }
}


/**
 * 3-4 sagaMiddleware
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * 
 * 2-3 checkout store from reducer
 * 
const store = createStore(reducer,applyMiddleware());
 * 
 * 3-4 use middleware redux-saga
 * 
const store = createStore(reducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(MySaga);
 * 
 */
const store = createStore(reducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(MySaga);

/**
* -----------------------------------------------------------------------------
*/
/**
 * 1-4 set ReactDom.render
 * 
 * 
 ReactDom.render(
  <App />
  ,
  document.getElementById("app")
);
 *
 * 2-4 settting redux component to render
 * 
 <Provider store={store} >
 *  
 */
ReactDom.render(
  <Provider store={store} >
  <App />
  </Provider>
  ,
  document.getElementById("app")

);
