let re1 = /ABC\-001/;

console.log(re1.test('ABC-0012'));

console.log('a,b;; c  d'.split(/[\s\,\;]+/)); // ['a', 'b', 'c', 'd']