import { useEffect } from "react";
import { useState, useCallback, useRef } from "react";

// impure function
// pure function

// 1. không bị reset giá trị mỗi khi component re-render, khi muốn binding một chiều cho input
// 2. DOM đến element trên giao diện
export function Ref() {
  const [value, setValue] = useState("");
  let _value = useRef("abc"); // không bị reset giá trị mỗi khi component re-render

  console.log(_value);

  const handleChange = useCallback((event) => {
    // setValue(event.target.value);
    _value.current = event.target.value;
  }, []);

  const [count, setCount] = useState(0);

  useEffect(() => {
    // console.log(inputRef);
    inputRef.current.focus();
  }, []);
  const inputRef = useRef();
  return (
    <>
      <input ref={inputRef} onChange={handleChange} id="12" />
      <button
        onClick={() => {
          console.log("gia tri cua input", inputRef.current.value);
        }}
      >
        Submit
      </button>

      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  );
}
