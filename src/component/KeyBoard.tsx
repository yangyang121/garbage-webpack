import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

interface Props {
  passwordCount: number;
}

export const shuffleKeyboard = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let i = arr.length - 1;
  while (i > 0) {
    const changeNum = Math.floor(Math.random() * (i - 1));
    [arr[i], arr[changeNum]] = [arr[changeNum], arr[i]];
    i--;
  }
  return arr;
};
const shuffleArr = shuffleKeyboard();

function KeyBoard(props: Props) {
  const [password, setPassword] = useState<number[]>([]);

  function handleAdd(value: number) {
    const result = password.concat(value);
    if (password.length < props.passwordCount) {
      if (result.length === props.passwordCount) {
        console.log("complete", result);
      }
      setPassword(result);
    }
  }

  function handleDelete() {
    setPassword(password.slice(0, -1));
  }

  return (
    <div>
      <div>
        <div className="password-value-wrap">
          {Array.from({ length: props.passwordCount }).map((_, index) => (
            <span
              key={index}
              className={index < password.length ? "active" : ""}
            ></span>
          ))}
        </div>
      </div>
      <div>
        <div className="keyborad-wrap">
          {shuffleArr.map((item, index) => {
            if (index === shuffleArr.length - 1) {
              return (
                <React.Fragment key={item}>
                  <span></span>
                  <span onClick={() => handleAdd(item)}>{item}</span>
                  <span onClick={handleDelete}>
                    <DeleteOutlined />
                  </span>
                </React.Fragment>
              );
            }
            return (
              <span key={item} onClick={() => handleAdd(item)}>
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

KeyBoard.defaultProps = {
  passwordCount: 6
};

export default KeyBoard;
