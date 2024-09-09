let user = {
    name_: "xiaoming",
    id: "woshiniba"
};

let newUser = {
    name_: "daming",
    id: "woshinibaba"
};

function getId() {
    console.log(this.name_);
    console.log(this.id);
}

// user.getId();

getId();

let getUserId = getId.bind(user);

getUserId();

let getNewUserId = getId.bind(newUser);

getNewUserId();

let newFunc1 = getUserId.bind(newUser);
let newFunc2 = getId.bind(newUser);

newFunc1();
newFunc2();