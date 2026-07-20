import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle end correctly', () => {
    const source = () => {
      return (end: any, cb: any) => {
        cb(null, 1);
        cb(null, 2);
        cb(null, 3);
        cb(true);
      };
    };

    const callback = jest.fn();

    const reducer = reduce((acc: any, data: any) => acc + data, 0, callback);
    reducer(source());

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, 6);
  });
});