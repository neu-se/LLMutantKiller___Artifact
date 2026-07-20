import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback with the correct value when the test function returns true', () => {
    const values = [1, 2, 3, 4, 5];
    let callbackCalled = false;
    let foundValue;
    const testStream = (read) => {
      return function (end, cb) {
        if (end) {
          cb(end);
        } else if (values.length > 0) {
          cb(null, values.shift());
        } else {
          cb(true);
        }
      };
    };
    const callback = jest.fn();
    find((data: any) => data === 5, (err: any, value: any) => {
      callbackCalled = true;
      foundValue = value;
      callback(err, value);
    })(testStream);
    expect(callbackCalled).toBe(true);
    expect(foundValue).toBe(5);
  });
});