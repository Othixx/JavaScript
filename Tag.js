let name = '小明';
let age = 20;

function myTag(strings, name, age) {
    console.log(strings[0]); // '这是'
    console.log(strings[1]); // '，今年'
    console.log(strings[2]); // '岁了'
    console.log(name); // '小明'
    console.log(age); // 20
    return 'OK';
}

let sentence = myTag`这是${name}，今年${age}岁了`;
console.log(sentence); // OK
