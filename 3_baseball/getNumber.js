// 4개의 랜덤한 숫자 만드는 함수
export const getNumber = () => {
  let candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let result = [];
  for (let i = 0; i < 4; i++) {
    let idx = Math.floor(Math.random() * candidates.length);
    let num = candidates.splice(idx, 1)[0];
    result.push(num);
  }
  console.log(result);
  return result.join("");
};
