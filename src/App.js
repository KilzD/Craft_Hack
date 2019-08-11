import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import $ from "jquery"
import ComponentChecker from "./components/ComponentChecker"
import Fantasy from "./components/Fantasy"

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
            ++arr[id];

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

        this.dropData = () => {
            let arr = [];

            for (let i = 0; i < JSON.parse(localStorage.getItem("theme")).imgCount; i++)
                arr.push(0);
            this.setState((prev) => {
                return {
                    id: prev.id,
                    elements: arr,
                    num_of_blocks: 0
                }
            });
        };

        this.toPercentBoxes = () => {
            this.setState((prev) => {
                for (let i = 0; i < prev.elements.length; i++)
                    prev.elements[i] *= 2.5;
                return {
                    id: prev.id,
                    elements: prev.elements,
                    num_of_blocks: prev.num_of_blocks
                }
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
        console.log("Выполнено");
        let func = this.auth;
        let theme = this.GetTheme();
        this.elementsNumberDef(theme);
    }

    render() {

        return (
            <div>
                <ComponentChecker theme={JSON.parse(localStorage.getItem("theme"))}/>
            </div>
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

        let sync = true;
        let addedArr = [];
        let killProcess = false;
        let childs = [];
        let ajax = 0;

        let theme = JSON.parse(localStorage.getItem("theme"));

        let getNum = this.getNum;
        let getArr = this.getArr;
        let addEll = this.addElement;
        let dropdata = this.dropData;
        let toPercent = this.toPercentBoxes;

        $( "#btn2" ).click(function() {
            $('#megaflex').css("display", "none");
        });

        $('#btn').onclick = {};
        $('#btn2').onclick =

        $('.pictures').on("mousedown touchstart", function () {
            if (sync) {
                sync = false;
                let id = $(this).attr("id");
                if (addedArr.indexOf(id)) {
                    addedArr.push(id);
                }
                let th = theme;

                if ((th.progressbar !== "cyberpunk") && (th.progressbar !== "scifi")) {
                    childs.push(setInterval(function () {
                        if (getNum() !== 40) {
                            addEll(id);
                            $('.element').css("height", (760 / 40 * getNum() + "px"));
                            console.log(getNum());
                        } else {
                            if (ajax === 0) {
                                ajax = 1;
                                toPercent();
                                $('.element').css("height", (0));
                                setTimeout($('#megaflex').css("display", "block"), 200);
                                $.ajax({
                                    url: localhost + "/state",
                                    type: "post",
                                    data: {recipe: getArr()},
                                    success: function (data) {
                                        console.log(data);
                                        dropdata();
                                        $('.element').html("");
                                        $('#result').html("У вас получилось: " + data.name);
                                        ajax = 0;
                                    },
                                    error: function (err) {
                                        console.log("У вас не получилось зелье!");
                                        dropdata();
                                        $('.fl').html("");
                                        $('#result').html("У вас ничего не вышло!");
                                        ajax = 0;
                                    }

                                })
                            }
                        }
                    }, 200 * theme.speed));
                }
                else {
                    childs.push(setInterval(function () {
                        if (getNum() !== 40) {
                            addEll(id);
                            let arr = getArr();
                            if (theme.color) {
                                let htmlIn = "";
                                for (let i = 0; i < addedArr.length; i++)
                                    for (let j = 0; j < arr[Number(addedArr[i])]; j++) {
                                        htmlIn += '<div class="ch" style="background-color:' + th.colorsArr[Number(addedArr[i])] + '"></div>';
                                    }
                                $('.fl').html(htmlIn);
                            } else
                                $('.fl').append('<div class = "ch" ></div>');
                        } else {
                            if (ajax === 0) {
                                ajax = 1;
                                toPercent();
                                setTimeout($('#megaflex').css("display", "block"), 200);
                                $.ajax({
                                    url: localhost + "/state",
                                    type: "post",
                                    data: {recipe: getArr()},
                                    success: function (data) {
                                        console.log(data);
                                        dropdata();
                                        $('.fl').html("");
                                        $('#result').html("У вас получилось: " + data.name);
                                        ajax = 0;
                                    },
                                    error: function (err) {
                                        dropdata();
                                        $('.fl').html("");
                                        $('#result').html("У вас ничего не вышло!");
                                        ajax = 0;
                                    }
                                })
                            }
                        }
                    }, 200 * theme.speed * th.mastery));
                }
                sync = true;
            }
        });

        $('.pictures').on('mouseleave touchend', function () {
            childs.forEach(function (child) {
                clearInterval(child);
            })
        });

        $('.pictures').on("mouseup", function () {
            childs.forEach(function (child) {
                clearInterval(child);
            })
        });
    }

}

export default App;
