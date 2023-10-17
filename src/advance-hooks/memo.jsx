import { useCallback } from "react";
import { useMemo } from "react";
import { useState, memo } from "react";

export function Memo() {
  return (
    <>
      <MauCam />
    </>
  );
}

// memo: nếu như props truyền vào không thay đổi thì component sẽ không re-render.
// mặc định của memo: so sánh sallow compare, Object.is để quyết định re-render.
// Object.is tương tự ===
const MauXanh = memo(
  function MauXanh() {
    return <div style={{ outline: "2px dashed blue" }}>Mau Xanh</div>;
  },
  //   (preProps, nextProps) => {
  //     console.log({ preProps, nextProps });
  //     // true: không re-render
  //     // false: re-render

  //     // ----- Mặc định React -----
  //     // const conditions = [];
  //     // for (let prop in preProps) {
  //     //   conditions.push(Object.is(preProps[prop], nextProps[prop]));
  //     // }
  //     // Kiểm tra tất cả phần tử đều thoải mãn điều kiện trả về. ( return )
  //     // nếu tất cả đều có điều kiện là true ---> true
  //     // nếu có 1 điều kiện false ----> false
  //     // return conditions.every((i) => i);
  //     // ----- Mặc định React -----

  //     // Custome
  //     if (preProps.arr.length === nextProps.arr.length) {
  //       return true;
  //     }

  //     return false;
  //   },
);

const cache = {};
const preDep = {};

const _useMemo = (cb, dep) => {
  // kiểm tra giá trị trong dep cũ và mới có thay hay không;
  // nếu có thay đổi thì nó sẽ gọi lại hàm cb()
  // nếu không thì nó sẽ trả về kết quả tính toán lần trước đó.

  // trước khi tính toán thì nó sẽ kiểm tra xem thử là cache đã có giá trị trước đó hya chưa

  //   const isChange = Object.is(preDep, dep);

  //   if (cache[cb] && isChange === false) {
  //     return cache[cb];
  //   }

  //   const value = cb();
  //   cache[cb] = value;

  return cb(); // return undefined
};

const _useCallback = (cb) => {
  return cb;
};

const arrCallApi = [1, 2, 573, 6, 3456, 3456, 12312];

function MauCam() {
  const [like, setLike] = useState(0);

  // useMemo: dùng để ghi nhớ giá trị của biến. tính toán phức tạp
  // dep: giống useEffect
  const arr = useMemo(() => {
    return arrCallApi.sort((a, b) => a - b);
  }, []);

  // useCallback: dùng để ghi nhớ giá trị của function.
  // dep: giống useEffect
  // Thường thì chúng ta sẽ kết hợp useCallback + memo
  // Không muốn tạo là function mỗi lần re-render
  // --------------
  // Dành cho những sự kiện của thẻ html
  const handleClick = useCallback(() => {
    setLike(like + 1);
  }, []);

  return (
    <div style={{ outline: "2px dashed orange", padding: 50 }}>
      Mau Cam
      <button onClick={handleClick}>{like}</button>
      <MauXanh handleClick={handleClick} />
    </div>
  );
}
/**
 * - Không nên lạm dụng,
 * - useCallback, memo, useMemo: đều phải tạo cache để lưu trữ những giá trị cũ trước đó.
 */
