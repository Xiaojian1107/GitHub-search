import React,{Component} from 'react'
import axios from 'axios'

export default class Search extends Component{

    myRef = React.createRef()

    search = ()=>{
        const {updateAppState} = this.props
        let keyWord = this.myRef.current.value
        if(keyWord.trim() === '') return
        const URL = `https://api.github.com/search/users?q=${keyWord}`
        updateAppState({
            users:[],
            isFirst:false,
            isLoading:true,
            error:''
          })
        axios.get(URL)
            .then((value)=>{
                updateAppState({
                    users:value.data.items,
                    isFirst:false,
                    isLoading:false,
                    error:''
                })
            })
            .catch((error)=>{
                updateAppState({
                    users:[],
                    isFirst:false,
                    isLoading:false,
                    error:error.message
                })
            })
        this.myRef.current.value = ''
    }

    render(){
        return (
            <div>
                <input type="text" placeholder="输入关键字" ref={this.myRef}/>&nbsp;
                <button onClick={this.search}>搜索</button>
            </div>
        )
    }
}