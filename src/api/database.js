const uuid = require ('uuid');

const db = [
    { 
        id: uuid.v4(),
        state: 'todo',
        text: '<b>Important!</b>Buy milk'
    },
    { 
        id: uuid.v4(),
        state: 'done',
        text: 'Pay electric bill'
    },
];

function save(todo) {
    const id = uuid.v4();
    db.push({
        id,
        state: 'todo',
        text: todo
    });
    return id;
}

function update(id, state) {
    const index = db.findIndex((item) => item.id === id);
    console.log(index);
    if (index > -1) {
        db[index].state = state;
    }
}

function query(id) {
    return db;
}

module.exports = {
    save,
    query,
    update
}