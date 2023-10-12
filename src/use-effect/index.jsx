import React, { useEffect, useState } from "react";

/**
 * useEffect(callback, dependencies)
 * useEffect: callback chạy sau khi component render xong trên giao diện
 * - TH1: dependencies = undefined, luôn chạy [[callback]] khi component re-render -> updating :: ít dùng.
 * - TH2: dependencies = [],
 * - TH3: dependencies = [like, count]
 *
 * un-mounting: sẽ được sử lý trong return của callback - cleanup function
 * - clean-up function nó sẽ chạy trước khi component chúng ta bị xóa khỏi giao diện.
 * - Xóa đi những tác vụ chạy ngầm của component
 */

export function DemoUseEffect() {
  const [count, setCount] = useState(0);

  // - TH1: dependencies = undefined, mounting ✅, updating ✅, unmounting ❌
  // useEffect(() => {
  //   console.log("[[TH1]]");
  // });
  // --------------

  // - TH2: dependencies = [], mounting ✅, updating ❌, unmounting ❌
  // - Sử dụng: Call Api get data, lắng nghe sự kiện window, ...
  // * Chỉ gọi 1 lần duy nhất khi component mounting.
  useEffect(() => {
    console.log("[[TH2]]");

    // unmounting
    const cleanUp = () => {
      console.log("[[TH2]] un-mounting");
    };
    return cleanUp;
  }, []);

  // - TH3: dependencies = [like, like2], chạy lại khi bất kỳ 1 giá trị nào trong dependencies thay đổi
  //  mounting ✅, updating phụ thuộc vào giá trị dependencies, unmounting ❌
  // - Khi giá trị like hay like2 thay đổi chỉ cần 1 trong 2 thay đổi thì callback sẽ được gọi lại
  const [like, setLike] = useState(0);
  const [like2, setLike2] = useState(0);

  useEffect(() => {
    console.log("[[TH3]]");

    return () => {
      // Mounting ❌ , updating ✅, un-mounting ✅
      // chạy trước khi component re-render
      console.log("[[TH3]] clean-up", { like });
    };
  }, [like, like2]);
  // -------------------------------------

  useEffect(() => {
    // count = 0
    // setInterval: chạy sau 1 khoảng thời gian
    const id = setInterval(() => {
      setCount((currentCount) => currentCount + 1);
    }, 200);

    // setTimeout: chạy 1 lần sau 1 khoảng thời gian
    // setTimeout(() => {
    //   console.log("timeout");
    // }, 5000);

    // clean-up function, chạy khi component un-mounting
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setLike(Math.floor(Math.random() * 1000))}>
        Like: {like}
      </button>

      <button onClick={() => setLike2(Math.floor(Math.random() * 1000))}>
        Like2: {like2}
      </button>

      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <Child /> */}
    </div>
  );
}

function Child() {
  console.log("[[4]]");

  useEffect(() => {
    console.log("[[5]]");
  });

  console.log("[[6]]");

  return <>Child</>;
}
