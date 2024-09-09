let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach(function (student) {
            // Error: Cannot read property 'title' of undefined
            console.log(this);
            console.log(this.title + ': ' + student);
        });
    }
};

group.showList();