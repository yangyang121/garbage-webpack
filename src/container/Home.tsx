import React from "react";
import { limitRequest, IRequest } from "../utils";

function Home() {
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
  return <div>Home</div>;
}

export default Home;
