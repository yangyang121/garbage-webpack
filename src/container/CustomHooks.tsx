import React, { useState, useEffect } from "react";
import { Spin, Button } from "antd";
import useLoading from "../component/useLoading";

const mockRequest = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("请求成功");
    }, 1000);
  });
};

function CustomHooks() {
  const [loading, load] = useLoading();
  const [loadIndex, setLoadIndex] = useState<number>(1);
  useEffect(() => {
    load(mockRequest().then(res => console.log(res)));
  }, [loadIndex]);
  return (
    <div>
      <span>UseLoading</span>
      <Spin spinning={loading}>
        <Button onClick={() => setLoadIndex(loadIndex + 1)}>刷新</Button>
        <div>{loadIndex}</div>
      </Spin>
    </div>
  );
}

export default CustomHooks;
