import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback with the correct value when the test function returns true', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let callbackCalled = false;
    let foundValue;
    const testStream = (read) => {
      return function (end, cb) {
        if (end) {
          cb(end);
        } else {
          const value = values.shift();
          cb(null, value);
        }
      };
    };
    find((data) => data === 5, (err, value) => {
      callbackCalled = true;
      foundValue = value;
    })(testStream);
    expect(callbackCalled).toBe(true);
    expect(foundValue).toBe(5);
  });
});