export interface IRequest {
  url: string;
  cb?: (data: any) => void;
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

const mockRequest = (url: string) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ response: url });
    }, Math.floor(Math.random() * 10) * 1000);
  });

export const limitRequest = (
  limit: number,
  requestArr: IRequest[],
  completeFn?: Function
) => {
  let index = 0;
  let completeIndex = 0;
  const handleRequest = (data: IRequest) => {
    mockRequest(data.url).then(res => {
      completeIndex++;
      data.cb && data.cb(res);
      index < requestArr.length && handleRequest(requestArr[index++]);
      if (completeIndex === requestArr.length && completeFn) {
        completeFn();
      }
    });
  };
  while (index < Math.min(limit, requestArr.length)) {
    handleRequest(requestArr[index++]);
  }
};

type UniversalObject = {
  [propname: string]: string;
};

export const printf = (str: string, obj: UniversalObject) => {
  let result = str;
  let startIndex = result.indexOf("${");
  let endIndex = result.indexOf("}");
  while (startIndex > -1 && endIndex > -1) {
    result =
      result.slice(0, startIndex) +
      obj[result.slice(startIndex + 2, endIndex)] +
      result.slice(endIndex + 1);
    startIndex = result.indexOf("${");
    endIndex = result.indexOf("}");
  }

  console.log(result);
};
