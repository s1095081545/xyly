// function flatten(arr) {
//   let res = String(arr).split(",");
//   res=res.map(item=>+item)
//   return res;
// }

// let res = [];
// function flatten(arr) {
//   arr.forEach(item => {
//     if (item instanceof Array) {
//       flatten(item);
//     } else {
//       res.push(item);
//     }
//   });
//   return res;
// }

// function flatten(arr) {
//   // return [].concat(
//   //   ...arr.map(item => (Array.isArray(item) ? flatten(item) : item))
//   // );

//   return arr.concat([1,2])
// }

// console.log(flatten([1, 2, [3, 4, [5, 6]]]));

// 节流
function de() {
  let flag = true;
  return function() {
    console.log(2);
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      console.log(1);
      flag = true;
    }, 2000);
  };
}

const a=de();
setInterval(() => {
  a();
}, 200);


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))
