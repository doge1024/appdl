import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import { message, Input, Button, Pagination } from 'antd';
import cfetch from './util/util.js'

class AppCell extends Component {

    download = ()=>{
        let appInfo = this.props.appInfo;
        window.location.href = appInfo.down_u
    };

    render() {
        let appInfo = this.props.appInfo;
        let first = this.props.first;
        let imageUrl = appInfo.thumb;
        imageUrl = cfetch.getUrl("/transform/appicon", {url: encodeURIComponent(imageUrl)});

        return (
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: 90, marginBottom: 20 }}>
                    <img crossOrigin="＊"
                         style={{ alignSelf: "center", height: 80, width: 80, marginTop: 0, marginBottom: 0, marginLeft: 10, marginRight: 10 }}
                         src={imageUrl} />
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: 90, width: "100%"}} >
                        <span style={{ left: 60, color: (first? "red": "black") }} >{appInfo.title}</span>
                        <span style={{ left: 60, textOverflow: "ellipsis", overflow: "hidden", height: (60)}} >{appInfo.desc}</span>
                    </div>
                    <div style={{ alignSelf: "center", marginLeft: 20, marginRight: 20}}>
                        <Button onClick={this.download} type={"primary"} icon={"download"} />
                    </div>
                </div>
        )
    }
}

const Search = Input.Search;
const PageLimit = 15;

class App extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        data: null,
        currentPage: null,
        keyword: "飞猪",
    };

    search = (keyword) => {
        if (!keyword && keyword.length <= 0) {
            return
        }

        this.requestData( this.state.keyword, 1)
    };

    requestData(keyword, page) {
        if (!keyword && keyword.length <= 0) {
            return
        }
        if (page === null || parseInt(page) - 1 < 0) {
            page = 1
        } else {
            page = parseInt(page)
        }

        fetch(cfetch.getUrl("/search", {key: keyword, page: page - 1, pageLimit: PageLimit}),{
            method: 'GET'
        }).then(
            (response)=>{
                if(response.status!==200){
                    message.error("存在一个问题，状态码为："+response.status);
                    return;
                }
                response.json().then((data)=>{
                    let state = {"data": data, currentPage: page};
                    if (page == 1) {
                        state.totalPage = parseInt(data.pageCount)
                    }
                    this.setState(state)
                }).catch((err)=>{
                    message.error(String(err));
                    this.setState({"data": null, currentPage: null})
                });
            }
        ).catch((err)=>{
            message.error(String(err));
            this.setState({"data": null, currentPage: null})
        });
    }

    paginationOnChange = (index)=>{
        if (index > 0 && index <= this.state.totalPage) {
            this.requestData( this.state.keyword, index)
        }
    };

    render() {
        let listItems = [];
        if (this.state.data !== null) {
            let data = this.state.data;
            if (data.firstApp !== undefined) {
                listItems.push(<AppCell first={true} appInfo={data.firstApp} key={"" + data.firstApp.iid + listItems.length} />)
            }

            if (data.content !== undefined) {
                data.content.map((appInfo) =>
                    listItems.push(<AppCell first={false} appInfo={appInfo} key={"" + appInfo.iid + listItems.length}/>)
                );
            }
        }

        let appInfo = this.state.data;
        let page = null;
        if (appInfo && this.state.currentPage > 0 && this.state.totalPage > 0) {
            page = (<Pagination simple pageSize={PageLimit} total={this.state.totalPage * PageLimit} current={this.state.currentPage} onChange={this.paginationOnChange} />)
        }

        return (
            <div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ marginTop: 100 }}>
                        <Search
                            style={{ width: 200 }}
                            placeholder="破解版App的名字"
                            defaultValue={this.state.keyword}
                            onSearch={value => this.search(value)}
                            enterButton
                        />
                    </div>
                    <div style={{ marginTop: 100 }}>
                        {listItems}
                    </div>
                    <div style={{marginBottom: 50}}>
                        {page}
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
