import { useState } from "react";
import { flushSync } from "react-dom";
import { DemoUseEffect } from "./use-effect";
import { TodoList } from "./use-effect/todo-list";
// rfce | rfc: tạo nhanh 1 function component

// const _useState = (initValue) => {
//   let state = initValue;
//   const setState = () => {};
//   return [state, setState];
// };

/** closure
 * khi khởi tạo 1 function nó sẽ nhớ vị trị, nơi nó đó tạo ra.
 */

export function App() {
  // const count = 50;

  // [[ state ]]
  const initialCount = 11; // 0xaaaaa , 0xbbbbb

  // atomic: chia nhỏ state ra để quản lý.

  // destructuring với array
  const [count, setCount] = useState(initialCount);
  /*
  const stateCount = useState(initialCount);
  const count = stateCount[0];
  const setCount = stateCount[1];
  */

  const [like, setLike] = useState(10);
  const [fullName, setFullName] = useState({ firstName: "", lastName: "" });
  const [fz, setFz] = useState(16);
  const [numb, setNumb] = useState(1);

  // giống với lại state bên class ❌
  // const [state, setState] = useState({
  //   count: 10,
  //   like: 10,
  //   fullName: {
  //     firstName: "",
  //     lastName: "",
  //   },
  // });

  // console.log({ stateCount });
  // ----------
  const handle = () => {
    for (let i = 0; i < 1000; i++) {
      console.log(i);
    }
  };

  const handleChangeCount = () => {
    // setState: thì component sẽ chạy lại toàn bộ nội dung bên trong component, state sẽ không tạo lại
    // biến, function,... mới tạo lại
    console.log("[[1]]");
    setCount(count + 1); // không đợi function này thực thi xong
    console.log("[[2]]");
  };

  // console.log("[[3]]");
  const [show, setShow] = useState(true);

  return <TodoList />;

  return (
    <>
      {show && <DemoUseEffect />}

      <button
        onClick={() => {
          setShow((s) => !s);
        }}
      >
        Toggle
      </button>

      <button onClick={handleChangeCount}>Count: {count}</button>
      <button
        onClick={() => {
          // count = 11;
          // setCount(count + 3)
          // flushSync(() => {
          //   setCount(count + 1); // 11 + 1 => 12
          // });
          // console.log({ count });
          // setCount(count + 1); // 11 + 1 => 12
          // setCount(count + 1); // 11 + 1 => 12

          // setState truyền callback-fn
          setCount((currentState) => {
            console.log({ currentState });
            return currentState + 1; // 12
          });

          setCount((currentState) => {
            console.log({ currentState }); //12
            return currentState + 1; // 13
          });

          setCount((currentState) => {
            console.log({ currentState }); // 13
            return currentState + 1;
          });
        }}
      >
        +3
      </button>
      <p
        style={{
          fontSize: fz, // tự động chuyển về px
        }}
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, quas.
      </p>
      <button
        onClick={() => {
          // setFz(fz + 1);
          setFz((f) => f + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          // setFz(fz - 1);
          setFz((f) => f - 1);
        }}
      >
        -
      </button>

      <div>
        <img
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
          }}
          src={`https://i.pravatar.cc?img=${numb}`}
          //"https://i.pravatar.cc?img=12" ====>>> ?img=1 -> 20
        />
        <button
          onClick={() => {
            const ran = Math.floor(Math.random() * 20) + 1;
            setNumb(ran);
          }}
        >
          random
        </button>
      </div>

      <Child count={count} like={"fasdfas"} count2={10} />
    </>
  );
}

// function Child(count, like, count2)
// 3 tham số trở lên thì các bạn nên chuyển nó về kiểu object
function Child(props) {
  // console.log(props);
  // muốn nhận count = 50 của Component App

  return (
    <div
      style={{
        color: "blue",
        background: "green",
        padding: 50,
      }}
    >
      child
    </div>
  );
}
