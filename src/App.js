// import React, { Component } from "react";
import React, { Component, useState, useEffect } from "react";
import "./App.css";
import Products from "./pages/Products";
import ChatBot from "react-simple-chatbot";
import axios from "axios";

let product = {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productValue: "",
      userName: "",
      steps: [
        {
          id: "1",
          message: "Hi!, I'm Philip",
          trigger: "2"
        },
        {
          id: "2",
          message: "What can I call you?",
          trigger: "name"
        },
        {
          id: "name",
          user: true,
          trigger: "3"
        },
        {
          id: "3",
          message: "Hi {previousValue}! How may I help you?",
          trigger: "first"
        },
        {
          id: "first",
          options: [
            {
              value: "buy",
              label: "Looking to buy a new product",
              trigger: "buy"
            },
            {
              value: "feedback",
              label: "Want to give a feedback",
              trigger: "feedback"
            }
          ]
        },
        {
          id: "buy",
          message: "What do you want to buy?",
          trigger: "product"
        },
        // {
        //   id: "products",
        //   message: "Are you searching for {previousValue}?",
        //   trigger: "searchProduct"
        // },
        {
          id: "product",
          options: [
            {
              value: "bodyGroomers",
              label: "Body Groomers",
              trigger: "productMsg"
            },
            {
              value: "faceShavers",
              label: "Face Shavers",
              trigger: "productMsg"
            },
            {
              value: "faceStylers",
              label: "Face Stylers",
              trigger: "productMsg"
            },
            {
              value: "faceSkin",
              label: "Face Skin",
              trigger: "productMsg"
            },
            {
              value: "airPurifiers",
              label: "Air Purifiers",
              trigger: "productMsg"
            }
          ]
        },
        {
          id: "productMsg",
          message: "You may be looking for one of these:",
          trigger: "searchProduct"
        },
        {
          id: "searchProduct",
          component: <Products type={"{ previousValue }"} />,
          asMessage: true,
          trigger: "boughtProduct"
        },
        {
          id: "boughtProduct",
          message: "Did you buy any product?",
          trigger: "answerIfBuy"
        },
        {
          id: "answerIfBuy",
          options: [
            {
              value: "yes",
              label: "Yes",
              trigger: "yesBought"
            },
            {
              value: "no",
              label: "No",
              trigger: "notBought"
            }
            // {
            //   value: "other",
            //   label: "Want to see other products",
            //   trigger: "product"
            // }
          ]
        },
        {
          id: "yesBought",
          message: "Congratulations! You are rewarded with 1000 points!",
          trigger: "redeem"
        },
        {
          id: "redeem",
          message: "You can redeem it for the next purchase",
          trigger: "likeProduct"
        },
        {
          id: "likeProduct",
          message: "Hope you like the product!",
          trigger: "thankyou"
        },
        {
          id: "thankyou",
          message:
            "Thank you for your time! See you again! Have a nice day! Bye bye!",
          end: true
        },
        {
          id: "notBought",
          message: "You can always buy later. Do visit again..",
          trigger: "thankyou"
        },
        {
          id: "shavers",
          message: "SHaver",
          end: true
        },
        {
          id: "feedback",
          message: "Did you love the product you bought?",
          trigger: "fdbkAns"
        },
        {
          id: "fdbkAns",
          options: [
            {
              value: "1",
              label: "Worse",
              trigger: "endFdbk"
            },
            {
              value: "2",
              label: "Bad",
              trigger: "endFdbk"
            },
            {
              value: "3",
              label: "Okay",
              trigger: "endFdbk"
            },
            {
              value: "4",
              label: "Good",
              trigger: "endFdbk"
            },
            {
              value: "5",
              label: "Excellent",
              trigger: "endFdbk"
            }
          ]
        },
        {
          id: "endFdbk",
          message: "Nice to hear from you! Do visit again :)",
          end: true
        },
        {
          id: "productFeedback",
          user: true,
          trigger: "7"
        },
        {
          id: "serviceFeedback",
          user: true,
          trigger: "7"
        },
        {
          id: "7",
          message: "Bye!",
          end: true
        }
      ]
    };
  }

  // fetchProducts() {
  //   axios
  //     .post(`https://jsonplaceholder.typicode.com/users`, { product })
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //     })
  //     .catch(err => {
  //       console.log("Error in fetching products:: ", err);
  //     });
  // }

  render() {
    return (
      <div className="App">
        <ChatBot
          steps={this.state.steps}
          headerComponent={
            <div className="header-bar">
              <img
                // src="https://cdn3.iconfinder.com/data/icons/chat-bot-emoji-blue-filled-color/300/14134081Untitled-3-512.png"
                // src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiM5M0M3RUY7IiBkPSJNMzAyLjU0NSw2OS44MThjMC0yNS43MDctMjAuODQtNDYuNTQ1LTQ2LjU0NS00Ni41NDVzLTQ2LjU0NSwyMC44MzgtNDYuNTQ1LDQ2LjU0NQ0KCWMwLDE3LjIyNSw5LjM2NSwzMi4yNTQsMjMuMjczLDQwLjMwNHY4My44MThoNDYuNTQ1di04My44MThDMjkzLjE4MSwxMDIuMDczLDMwMi41NDUsODcuMDQzLDMwMi41NDUsNjkuODE4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzVBOEJCMDsiIGQ9Ik0yNTYsMjMuMjczdjE3MC42NjdoMjMuMjczdi04My44MThjMTMuOTA4LTguMDQ5LDIzLjI3My0yMy4wNzcsMjMuMjczLTQwLjMwNA0KCUMzMDIuNTQ1LDQ0LjExMSwyODEuNzA1LDIzLjI3MywyNTYsMjMuMjczeiIvPg0KPHJlY3QgeT0iMjQwLjQ4NSIgc3R5bGU9ImZpbGw6IzkzQzdFRjsiIHdpZHRoPSIyNDguMjQyIiBoZWlnaHQ9IjEyNC4xMjEiLz4NCjxyZWN0IHg9IjI2My43NTgiIHk9IjI0MC40ODUiIHN0eWxlPSJmaWxsOiM1QThCQjA7IiB3aWR0aD0iMjQ4LjI0MiIgaGVpZ2h0PSIxMjQuMTIxIi8+DQo8cmVjdCB4PSIxODYuMTgyIiB5PSIzNjQuNjA2IiBzdHlsZT0iZmlsbDojOTNDN0VGOyIgd2lkdGg9IjEzOS42MzYiIGhlaWdodD0iMTI0LjEyMSIvPg0KPHJlY3QgeD0iMjU2IiB5PSIzNjQuNjA2IiBzdHlsZT0iZmlsbDojNUE4QkIwOyIgd2lkdGg9IjY5LjgxOCIgaGVpZ2h0PSIxMjQuMTIxIi8+DQo8cmVjdCB4PSI0Ni41NDUiIHk9IjE2Mi45MDkiIHN0eWxlPSJmaWxsOiNDQ0U5Rjk7IiB3aWR0aD0iNDE4LjkwOSIgaGVpZ2h0PSIyNzkuMjczIi8+DQo8cmVjdCB4PSIyNTYiIHk9IjE2Mi45MDkiIHN0eWxlPSJmaWxsOiM5M0M3RUY7IiB3aWR0aD0iMjA5LjQ1NSIgaGVpZ2h0PSIyNzkuMjczIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojM0M1RDc2OyIgZD0iTTE5My45MzksMjcxLjUxNWMwLDE3LjEzOC0xMy44OTQsMzEuMDMtMzEuMDMsMzEuMDNsMCwwYy0xNy4xMzYsMC0zMS4wMy0xMy44OTItMzEuMDMtMzEuMDNsMCwwDQoJYzAtMTcuMTM4LDEzLjg5NC0zMS4wMywzMS4wMy0zMS4wM2wwLDBDMTgwLjA0NiwyNDAuNDg1LDE5My45MzksMjU0LjM3NywxOTMuOTM5LDI3MS41MTVMMTkzLjkzOSwyNzEuNTE1eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzFFMkUzQjsiIGQ9Ik0zODAuMTIxLDI3MS41MTVjMCwxNy4xMzgtMTMuODk0LDMxLjAzLTMxLjAzLDMxLjAzbDAsMGMtMTcuMTM3LDAtMzEuMDMtMTMuODkyLTMxLjAzLTMxLjAzbDAsMA0KCWMwLTE3LjEzOCwxMy44OTQtMzEuMDMsMzEuMDMtMzEuMDNsMCwwQzM2Ni4yMjcsMjQwLjQ4NSwzODAuMTIxLDI1NC4zNzcsMzgwLjEyMSwyNzEuNTE1TDM4MC4xMjEsMjcxLjUxNXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMzQzVENzY7IiBkPSJNMTg2LjE4MiwzNDkuMDkxYzAsMzguNTU4LDMxLjI1OCw2OS44MTgsNjkuODE4LDY5LjgxOGwwLDBjMzguNTU4LDAsNjkuODE4LTMxLjI2LDY5LjgxOC02OS44MTgNCglIMTg2LjE4MnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMxRTJFM0I7IiBkPSJNMjU2LDM0OS4wOTFjMCwzOC41NTgsMCw0Ni41NDUsMCw2OS44MThsMCwwYzM4LjU1OCwwLDY5LjgxOC0zMS4yNiw2OS44MTgtNjkuODE4SDI1NnoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                src={require("./images/chatbot1.jpg")}
                width="80"
                height="80"
                style={{ marginRight: 20, borderRadius: 45 }}
              />
              <h3>Philips Chatbot Assistant</h3>
            </div>
          }
          botAvatar={require("./images/chatbot1.jpg")}
          // botAvatar={
          //   "https://cdn3.iconfinder.com/data/icons/chat-bot-emoji-blue-filled-color/300/14134081Untitled-3-512.png"
          // }
          headerTitle={"Philips Chatbot Assistant"}
          bubbleStyle={{
            fontSize: "16px",
            backgroundColor: "#006666",
            color: "#ffffff"
          }}
          style={{ width: "100%", height: "100%", fontSize: "16px" }}
          recognitionEnable="true"
          speechSynthesis={{ enable: true, lang: "en", voice: null }}
          // submitButtonStyle={{ backgroundColor: "#008080", color: "#ffffff" }}
        />
      </div>
    );
  }
}

export default App;
