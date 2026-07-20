import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback with the correct value when the test function returns true', () => {
    const testStream = (read) => {
      return function (end, cb) {
        if (end) {
          cb(end);
        } else {
          cb(null, 5);
        }
      };
    };
    const callback = jest.fn();
    find((data: any) => data === 5, callback)(testStream);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, 5);
  });
});