const uniqueObjectReturnerFromId = (objectArray) => {
  const array = [];
  const map = {};
  objectArray.forEach((object) => {
    if (!Object.keys(map).includes(object.id)) {
      map[object.id] = object;
      array.push(object);
    }
  });
  console.log('objectArray', objectArray, 'array', array);
  return array;
};

export default uniqueObjectReturnerFromId;
