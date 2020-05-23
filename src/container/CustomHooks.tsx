import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Button } from "antd";
import useLoading from "../component/useLoading";
import { RootState, Dispatch } from "../store";

const mockRequest = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("请求成功");
    }, 1000);
  });
};

function CustomHooks() {
  const [loading, load] = useLoading();
  const count = useSelector((state: RootState) => state.count);
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    load(mockRequest().then((res) => console.log(res)));
  }, [load]);
  return (
    <Spin spinning={loading}>
      <p>{count}</p>
      <p>
        <Button type="primary" onClick={() => dispatch.count.increment(1)}>
          Add
        </Button>
      </p>
      <Button onClick={() => load(dispatch.count.incrementAsync())}>Async Add</Button>
    </Spin>
  );
}

export default CustomHooks;
