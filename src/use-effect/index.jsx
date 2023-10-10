import React, { useEffect, useState } from "react";

/**
 * useEffect(callback, dependencies)
 * useEffect: callback chạy sau khi component render xong trên giao diện
 * - TH1: dependencies = undefined, luôn chạy [[callback]] khi component re-render -> updating :: ít dùng.
 * - TH2: dependencies = [],
 * - TH3: dependencies = [like, count]
 */

export function DemoUseEffect() {
  const [count, setCount] = useState(0);
  console.log("[[1]]");
  useEffect(() => {
    console.log("useEffect [[2]]");
  });
  // --------------
  console.log("[[3]]");

  return (
    <div>
      DemoUseEffect
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
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
