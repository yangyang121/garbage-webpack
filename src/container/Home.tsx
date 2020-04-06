import React from "react";
import { limitRequest, IRequest, printf, convertToRMB } from "../utils";

function utilsDemo() {
  const requestArr: IRequest[] = [
    {
      url: "/one",
      cb: data => {
        console.log(data);
      }
    },
    {
      url: "/two",
      cb: data => {
        console.log(data);
      }
    },
    {
      url: "/three",
      cb: data => {
        console.log(data);
      }
    },
    {
      url: "/four",
      cb: data => {
        console.log(data);
      }
    },
    {
      url: "/five",
      cb: data => {
        console.log(data);
      }
    },
    {
      url: "/six",
      cb: data => {
        console.log(data);
      }
    },
    {
      url: "/seven",
      cb: data => {
        console.log(data);
      }
    },
    {
      url: "/eight",
      cb: data => {
        console.log(data);
      }
    },
    {
      url: "/nine",
      cb: data => {
        console.log(data);
      }
    },
    {
      url: "/ten",
      cb: data => {
        console.log(data);
      }
    }
  ];
  const complete = () => {
    console.log("complete");
  };
  limitRequest(5, requestArr, complete);
  printf("My name is ${name}, my age is ${age}.", { name: "YY", age: "25" });
  convertToRMB(99999999);
  convertToRMB(1100);
  convertToRMB(101);
  convertToRMB(99);
  convertToRMB(347);
  convertToRMB(9090);
  convertToRMB(9009);
  convertToRMB(3400000);
  convertToRMB(3040300);
  convertToRMB(30404030);
  convertToRMB(30000004);
  convertToRMB(30000040);
}

function Home() {
  // utilsDemo();
  return <div>Home</div>;
}

export default Home;
