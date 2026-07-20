import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback when the test function returns true', () => {
    const testFunction = (data: any) => data === 5;
    const callback = jest.fn();
    const read = () => {
      return (end: any, cb: any) => {
        if (end) {
          cb(end);
        } else {
          cb(null, 5);
        }
      };
    };
    find(testFunction, callback)(read());
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, 5);
  });
});