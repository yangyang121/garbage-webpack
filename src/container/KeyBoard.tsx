import React, { useState } from "react";
import KeyBoard from "../component/KeyBoard";
import { Button } from "antd";

function KeyBoardWrap() {
  const [visible, setVisible] = useState<boolean>(false);
  const passwordCount = 6;
  function handleChange(arr: number[]) {
    console.log("change", arr);
    if (arr.length === passwordCount) {
      setVisible(false);
    }
  }

  return (
    <>
      {!visible && (
        <Button type="primary" onClick={() => setVisible(true)}>
          支付
        </Button>
      )}
      <KeyBoard
        visible={visible}
        className="my-keyboard-wrap"
        handleChange={handleChange}
      />
    </>
  );
}

export default KeyBoardWrap;
