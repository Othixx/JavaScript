const user = {
    name: '小明',
    walk: () => {
        console.log(this);
    },
};

// let xiaoming = new user;

user.walk();
console.log(this);