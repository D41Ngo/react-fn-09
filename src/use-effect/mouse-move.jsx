import { useEffect, useState } from "react";

const mock_data = `
    <button id="123">Click</button>   
    <h1>haha</h1> 
`;

export function MouseMove() {
  const [position, setPosition] = useState({ x: -20, y: -20 });

  // lắng nghe sự kiện window mousemove

  useEffect(() => {
    const mouseMove = (event) => {
      // 1. Lắng nghe được sự kiện
      // 2. Xem thử vị trí của con trỏ chuột
      //   console.log("mouse move", event);
      setPosition({ x: event.x, y: event.y });
    };
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // Đợi UI render xong, chúng ta mới gắng sự kiện xử lý cho thẻ mà chúng ta mong muốn, do BE trả về string HTML
  useEffect(() => {
    // console.log(document.getElementById("123"));

    const handleClick = () => {
      console.log("click");
    };

    const divEle = document.getElementById("123");
    divEle.addEventListener("click", handleClick);

    return () => {
      divEle.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: mock_data,
        }}
      />

      {/* <div
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          backgroundColor: "pink",
          borderRadius: "50%",
          //   cách 1: không tốt về hiệu năng. Tại vì thay đổi giá trị top, left
          //   transform: "translate(-50%,-50%)",
          //   binding
          //   left: position.x,
          //   top: position.y,

          //   cách 2: Thay đổi giá trị của translate.
          transform: `translate(${position.x}px, ${position.y}px)`,
          top: -20,
          left: -20,
        }}
      /> */}
    </>
  );
}
