
var _ = {};
// var _ = { a: 1, b: 2, c: 3, d: 4 };
// var _ = ['a', 'b', 'c', 'd'];
// ARRAYS

// _.first(array, [n])
// Returns an array with the first n elements of an array.
// If n is not provided it returns an array with just the first element.
// should return an array with the first element if n is not a number, is zero, or negative
// console.log(_.first);
_.first = function (array, n) {
  if (typeof array != 'object' || array == null) return [];
  if (n < 1 || isNaN(n)) return [array[0]];
  return Array.from(array).slice(0, n);
};

// _.last(array, [n])
// Returns an array with the last n elements of an array.
// If n is not provided it returns an array with just the last element.
_.last = function (array, n) {
  if (typeof array != 'object' || array == null) return [];
  if (n < 1 || isNaN(n)) return [array[array.length - 1]];
  return Array.from(array).slice(-n, array.length);
};

// _.uniq(array)
// Produces a duplicate-free version of the array, using === to test equality.
// In particular only the first occurence of each value is kept.
_.uniq = function (array) {
  return [...new Set(array)];
};

// OBJECTS

// _.extend(destination, source)
// Copies all the own enumerable properties in the source object over
// to the destination object, and returns it (without using `Object.assign`).
_.extend = function (destination, source) {
  Object.entries(source).map(item => {
    destination[item[0]] = item[1];
  });
  return destination;
};

// _.defaults(destination, source)
// Fills in undefined properties in the destination object
// with own enumerable properties present in the source object,
// and returns the destination object.
_.defaults = function (destination, source) {
  Object.entries(source).map(item => {
    if (!destination.hasOwnProperty(item[0])) {
      destination[item[0]] = source[item[0]];
    }
  });
  return destination;
};

// COLLECTIONS

// _.each(collection, iteratee, [context])
// Iterates over a collection of elements (i.e. array or object),
// yielding each in turn to an iteratee function, that is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Returns the collection for chaining.
_.each = function (collection, iteratee, context) {
  // Object.entries(collection).map(item => {
  //   iteratee.call(context, collection[item], item, collection);
  // })

  for (let item in collection) {
    if (collection.hasOwnProperty(item)) {
      // console.log(item);
      if (Array.isArray(collection)) {
        item = parseInt(item);
      }
      iteratee.call(context, collection[item], item, collection);
    }
  }
  return collection;
};

// _.contains(collection, value)
// Returns an array of indexes / keys where value can be found in the collection.
// TIP: here's a demo of how you can re-use already implemented methods in clever ways.
_.contains = function (collection, value) {
  var res = [];
  _.each(collection, function (el, key) {
    el === value && res.push(key);
  });
  return res;
};

// _.map(collection, iteratee, [context])
// Returns a new array of values by mapping each value in collection through iteratee.
// Each invocation of iteratee is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.map = function (collection, iteratee, context) {
  let newArray = [];
  _.each(collection, function (el, key, collection) {
    if (iteratee) {
      newArray.push(iteratee.call(context, el, key, collection));
    } else {
      newArray.push(el);
    }
  });
  return newArray;
};

// _.reduce(collection, iteratee, [accumulator], [context])
// Reduce boils down a collection of values into a single value.
// Accumulator is the initial state of the reduction,
// and each successive step of it should be returned by iteratee.
// Iteratee is passed four arguments: (accumulator, element, index|key, collection),
// and bound to the context if one is passed. If no accumulator is passed
// to the initial invocation of reduce, iteratee is not invoked on the first element,
// and the first element is instead passed as accumulator for the next invocation.
_.reduce = function (collection, iteratee, accumulator, context) {
  // console.log(collection);

  if (Array.isArray(collection)) {
    for (var i in collection) {
      if (accumulator) {
        accumulator = iteratee.call(context, accumulator, collection[i], i, collection);
      } else {
        accumulator = collection[i];
      }
    }
  } else {
    for (var prop in collection) {
      if (collection.propertyIsEnumerable(prop)) {
        if (accumulator) {
          accumulator = iteratee.call(context, accumulator, collection[prop], prop, collection);
        } else {
          accumulator = Object.values(collection)[0];
        }
      }
    }
  }
  return accumulator;
};

// _.filter(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.filter = function (collection, predicate, context) {
  let newArray = [];
  _.each(collection, function (el, key, collection) {
    if (predicate) {
      if (el != null) { newArray.push(predicate.call(context, el, key, collection)); }
    }
  });
  return newArray;
};

// _.reject(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that don't pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// TIP: can you reuse _.filter()?
_.reject = function (collection, predicate, context) {
  let newArray = [];
  _.each(collection, function (el, key, collection) {
    if (predicate) {
      predicate.call(context, el, key, collection);
      if (el == null) {
        newArray.push(el);
      }
    }
  });
  return newArray;
};

// _.every(collection, [predicate], [context])
// Returns true if all values in the collection pass the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a false element is found.
// TIP: without the short-circuiting you could reuse _.reduce(). Can you figure how?
// Because of the short-circuiting though, you need to implement it in a similar way as you did at _.each.
_.every = function (collection, predicate, context) {
  _.each(collection, function (el, key, collection) {
    // console.log(!predicate.call(context, el, key, collection));
    predicate.call(context, el, key, collection);
    if (!predicate.call(context, el, key, collection)) {
      // console.log('false found');
      return false;
    }
  });
  return true;
};

// _.some(collection, [predicate], [context])
// Returns true if any value in the collection passes the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a true element is found.
// TIP: what method that you have already implemented can be reused here?
_.some = function (collection, predicate, context) {
  _.each(collection, function (el, key, collection) {
    if (!predicate.call(context, el, key, collection)) {
      return true;
    }
    predicate.call(context, el, key, collection);
  });
  return false;
};

// _.invoke(collection, methodName, *arguments)
// Returns an array with the results of calling the method
// indicated by methodName on each value in the collection.
// Any extra arguments passed to invoke will be forwarded on to the method invocation.
_.invoke = function (collection, methodName, ...args) {
  let newArray = [];
  if (Array.isArray(collection)) {
    for (let item of collection) {
      let entry = item[methodName](...args);
      newArray.push(entry);
    }
  } else {
    for (let item in collection) {
      let value = collection[item];
      if (typeof value === 'function') {
        newArray.push();
      } else {
        let entry = value[methodName](...args);
        newArray.push(entry);
      }
    }
  }
  return newArray;
};

// _.pluck(collection, propertyName)
// A convenient version of what is perhaps the most common use-case for map:
// given an array of objects (collection), iterates over each element
// in the collection, and returns an array with all the values
// corresponding to the property indicated by propertyName.
_.pluck = function (collection, propertyName) {
  let copyArr = [...collection];
  collection = [];
  for (let group in copyArr) {
    let entry = copyArr[group];
    collection.push(entry[propertyName]);
  }
  return collection;
};

// FUNCTIONS

// _.once(func)
// Creates a version of the function that can only be called one time
// (with any arguments). Repeated calls to the modified function
// will have no effect, returning the value from the original call.
// Useful for initialization functions, instead of having to set
// a boolean flag and then check it later.
_.once = function (func) {
  let result;
  let executed = false;
  return function (arg) {
    if (!executed) {
      executed = true;
      result = func(arg);
      return result;
    } else {
      return result;
    }
  };
};

// _.memoize(func)
// Memoizes a given function by caching the computed result.
// Useful for speeding up slow-running computations.
// You may assume that the memoized function takes only one argument
// and that it is a primitive. Memoize should return a function that when called,
// will check if it has already computed the result for the given argument
// and return that value instead of recomputing it.
_.memoize = function (func) {
  let resultCache = {};
  return function (arg) {
    let key = arg;
    if (!Object.keys(resultCache).includes(key)) {
      let value = func(arg);
      resultCache[arg] = value;
      return value;
    } else {
      return resultCache[key];
    }
  };
};

// _.delay(function, wait, *arguments)
// Much like setTimeout(), invokes function after waiting milliseconds.
// If you pass the optional arguments, they will be forwarded
// on to the function when it is invoked.
_.delay = function (func, wait) {
  let arg = arguments[2];
  let delayedFunc = function () {
    return func(arg);
  };
  setTimeout(delayedFunc, wait);
};

// _.throttle(function, wait)
// Returns a new, throttled version of the passed function that,
// when invoked repeatedly (with any arguments), calls the original function
// at most once every wait milliseconds, and otherwise just returns
// the last computed result. Useful for rate-limiting events
// that occur faster than you can keep up with.
_.throttle = function (func, wait) {
  let last = 0;
  let result;
  return argsFunc => {
    const now = new Date().getTime();
    if (now - last >= wait) {
      result = func(argsFunc);
      last = now;
      return result;
    } else {
      return result;
    }
  };
};

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = _;
}

// _.extend(_, [3]);
