// there are two helper function to return unique array
// measure the time using console.time() for the small data the second one with
// object and key pairing technique is faster

// console.time('timer');
// console.timeEnd('timer');

// *** kindly check after major data handling which function is faster

// const uniqueObjectReturnerFromId = (objectArray) => {
//   const array = [];
//   objectArray.forEach((object) => {
//     const index = array.findIndex((e) => e.id === object.id);
//     if (index === -1) {
//       array.push(object);
//     } else {
//       array[index] = object;
//     }
//   });
//   console.log('objectArray', objectArray, 'array', array);
//   return array;
// };

const uniqueObjectReturnerFromId = (objectArray) => {
  const array = [];
  const map = {};
  let index = 0;
  objectArray.forEach((object) => {
    if (!Object.keys(map).includes(object.id)) {
      map[object.id] = index++;
      array.push(object);
    } else {
      array[map[object.id]] = object;
    }
  });
  return array;
};

export default uniqueObjectReturnerFromId;
