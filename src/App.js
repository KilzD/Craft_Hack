import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import $ from "jquery"
import Scifi from "./components/Scifi"
import ComponentChecker from "./components/ComponentChecker"

let localhost = "http://192.168.43.102:3000";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {id: null, num_of_blocks: 0};

        this.auth = () => {

            let func = this.CheckLogin;
            this.setState((prev) => {
                return {
                    id: func(),
                    elements: prev.elements,
                    num_of_blocks: prev.num_of_blocks
                }
            })
        };

        this.addElement = (id) => this.setState((prev) => {

            let arr = prev.elements.slice();
            console.log(id);
            ++arr[id];

            console.log(arr);

            return {
                id: prev.id,
                elements: arr,
                num_of_blocks: ++prev.num_of_blocks
            }
        });

        this.getNum = () => {
            return this.state.num_of_blocks;
        };

        this.getArr = () => {
            return this.state.elements;
        };

        this.dropAuth = () => {
            this.setState((prev) => {
                return {
                    id: null,
                    elements: [],
                    num_of_blocks: 0
                }
            })
        };

        this.elementsNumberDef = (theme) => {
            let arr = [];
            let num = theme.imgCount;

            for (let i = 0; i < num; ++i) {
                arr.push(0);
            }

            this.setState((prev) => {
                return {
                    id: prev.id,
                    elements: arr,
                    num_of_blocks: prev.num_of_blocks
                }
            })
        };

        this.toPercentBoxes = () =>{
            this.setState((prev)=>{
                for (let i=0;i<prev.elements.length;i++)
                    prev.elements[i] *= 2.5;
            });
        }
    }

    CheckLogin = () => {
        let id = null;

        $.ajax({
            url: localhost + "/usercheck",
            type: "post",
            data: {name: document.getElementById("login").value, pin: document.getElementById("pin").value},
            dataType: "json",
            crossDomain: true,
            success: function (data) {
                this.id = data.id;
            },
            fail: function (err) {
                console.log(err);
            }
        });

        return id;
    };

    GetTheme = () => {

        let theme = null;

        $.ajax({
            url: localhost + "/getgame",
            type: "post",
            async: false,
            dataType: "json",
            crossDomain: true,
            success: function (data) {
                theme = data;
                console.log(theme);
                localStorage.setItem("theme", JSON.stringify(theme));
            },
            fail: function (err) {
                console.log(err);
            }
        });

        return theme;
    };


    componentWillMount() {

        let func = this.auth;
        let theme = this.GetTheme();
        this.elementsNumberDef(theme);
    }

    render() {

        return (
            <ComponentChecker theme={JSON.parse(localStorage.getItem("theme"))}/>
            /*
            <div className="auth_place">
                <div className="auth_block">
                    <input id="login" type="text" placeholder="Ваше имя"/>
                    <input id="pin" type="text" placeholder="Ваш пинкод"/>
                    <button onClick={func}>Отправить</button>
                    <span>{this.state.id}</span>
                </div>
            </div>*/
        );
    }

    componentDidMount() {

        let child;
        let addEll = this.addElement;

        let theme = JSON.parse(localStorage.getItem("theme"));

        let getNum = this.getNum;
        let getArr = this.getArr;
        let addedArr =[];

        $('.pictures').on("mousedown", function () {
            let id = $(this).attr("id");
            if (addedArr.indexOf(id)){
                addedArr.push(id);
            }
            let th = theme;
            child = setInterval(function () {
                if (getNum() !== 40) {
                    let htmlIn = "";
                    addEll(id);
                    let arr = getArr();
                    if (theme.color) {
                        htmlIn = "";
                        for (let i = 0; i < addedArr.length; i++)
                            for (let j = 0; j < arr[Number(addedArr[i])]; j++) {
                                htmlIn += '<div class="ch" style="background-color:' + th.colorsArr[Number(addedArr[i])] + '"></div>';
                            }
                        $('.fl').html(htmlIn);
                    } else
                        $('.fl').append('<div class = "ch" ></div>');
                }
                else {
                    for (let i=0;i<th.imgCount;i++){

                    }
                    $.ajax({
                        url: localhost + "/",
                    })
                }
            }, 200 * theme.speed);
        });

        $('.pictures').on('mouseleave', function () {
            clearInterval(child);
        });

        $('.pictures').on("mouseup", function () {
            clearInterval(child);
        });
    }

}

export default App;
