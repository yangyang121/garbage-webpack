import React, { useState, useCallback } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { shuffleKeyboard } from "../utils";

interface Props {
  visible: boolean;
  passwordCount: number;
  className: string;
  handleChange: (arr: number[]) => void;
}

const shuffleArr = shuffleKeyboard();

function KeyBoard(props: Props) {
  const [password, setPassword] = useState<number[]>([]);

  const { handleChange, passwordCount } = props;

  const handleAdd = useCallback(
    (value: number) => {
      const result = password.concat(value);
      if (password.length < passwordCount) {
        setPassword(result);
        if (result.length === passwordCount) {
          setPassword([]);
        }
        handleChange(result);
      }
    },
    [handleChange, password, passwordCount]
  );

  const handleDelete = useCallback(() => {
    setPassword(password.slice(0, -1));
    handleChange(password.slice(0, -1));
  }, [handleChange, password]);

  return (
    <div
      className={props.className}
      style={{ display: props.visible ? "block" : "none" }}
    >
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
  visible: false,
  passwordCount: 6,
  className: "",
  handleChange: (arr: number[]) => {},
};

export default KeyBoard;
