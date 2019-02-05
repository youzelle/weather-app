
const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 1500);
       });
};

//catch is used to capture errors. If promise is rejected,
//the chain still sees the promises as settled and will
//settle next promise possibly with undefined values

asyncAdd(5, '7').then((result) => {
    console.log('Result: ', result);
    return asyncAdd(result, 33);
}).then((result) => {
    console.log('New Result: ', result);
}).catch((errorMessage) => {
    console.log(errorMessage);
});

// //a promise is settled once, either as resolved or rejected
// let somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve ('Hey, it worked!');
//         reject('Unable to fulfil promise');
//     }, 2500);
// });

// //only called if promise is fulfilled with value passed to resolve
// somePromise.then((message) => {
//     console.log('Success', message);
// }, (errorMessage) => {
//     console.log('Error', errorMessage);
// })