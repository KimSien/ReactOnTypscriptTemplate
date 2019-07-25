import * as React from "react";
import * as ReactDom from "react-dom";

import {Provider,connect} from "react-redux";
import {createStore,applyMiddleware} from "redux";

import createSagaMiddleware from 'redux-saga';
import { select,call, put, takeEvery, takeLatest ,delay ,all } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

function* AjaxGetPost(url: any){
  /**
   * ajax func
   */

   const returnValue:any = [];
   yield put({type:"ajax_get_post",v: returnValue});
}

function* MySaga(){
  yield all([
    takeLatest("AjaxGetPost",AjaxGetPost),
  ]);
}


interface Aprops{}
interface Astate{}
class AppComponent extends React.Component<Aprops,Astate>{

  state :Astate ={

  }

  public render(){
    return(
      <p>test</p>
    );
  }
}

const App :any =(()=>{

});


ReactDom.render(

  <App />
  ,
  document.getElementById("app")

);
