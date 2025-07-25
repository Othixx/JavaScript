const obj = {
    name: 'alice',
    greet: () => {
        console.log(this);
    }
}
obj.greet(); // Outputs: Hello, alice!