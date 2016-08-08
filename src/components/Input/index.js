import React from 'react';
import ReactDOM from 'react-dom';
import BaseModule from '../../libs/BaseModule';

//使用该模块，如果需要通过ref取节点的值，this.refs.[ref名].getValue()


export default class Input extends BaseModule {
    constructor( props ) {
        super(props);
        this.state.Value = ""
        this.state.textClass = ""
        this.state.pwdClass = " hide"
        this.state.test = (navigator.userAgent.indexOf("MSIE") > 0 && navigator.userAgent.indexOf("MSIE 10") == -1 && navigator.userAgent.indexOf("MSIE 11") == -1)
        this.state.changeBorder = this.props.changeBorder || false
    }
    
    getValue() {
        return this.state.Value;
    }
    

    componentDidMount() {
        if(this.state.test){
            this.setState({
                Value: this.props.placeholder
            })
        }
    }
    
    inputFocus(e) {
        if( this.state.test && e.target.value == e.target.getAttribute('placeholder')){
            this.setState({
                Value: ""
            })
        }
        if(this.state.changeBorder){
            e.target.style.borderColor = "#45a7ff";
        }
    }
    
    inputBlur(e) {
        if(this.state.test && e.target.value == ''){
            this.setState({
                Value: this.props.placeholder
            })
        }
        if(this.state.changeBorder){
            e.target.style.borderColor = "#e9e9e9";
        }
    }
    
    setValue(e) {
        this.setState({
            Value: e.target.value
        })
    }
    
    ieTextFocus(e) {
        let self = this
        this.setState({
            textClass: " hide",
            pwdClass: ""
        })
        setTimeout(function(){
            self.refs.pwd.focus()  
        },100)
    }
    
    iePwdBlur(e) {
        if(e.target.value == ""){
            this.setState({
                textClass: "",
                pwdClass: " hide"
            })
        }
        if(this.state.changeBorder){
            e.target.style.borderColor = "#e9e9e9";
        }
    }
    
    render() {
        if( this.state.test  && this.props.type == "password"){
            let { className, ref, ...other } = this.props
            return(
                <div>
                    <input {...other} className={className + this.state.textClass} type="text" value={this.props.placeholder} onFocus={this.ieTextFocus.bind(this)} />
                    <input {...other} ref="pwd" className={className + this.state.pwdClass } type="password"  onFocus={this.inputFocus.bind(this)} onBlur={this.iePwdBlur.bind(this)} onChange={this.setValue.bind(this)}/>
                </div>
            )
        }else{
            return(
                <input {...this.props} value={this.state.Value} onFocus={this.inputFocus.bind(this)} onBlur={this.inputBlur.bind(this)} onChange={this.setValue.bind(this)}/>
            )
        }
    }
}