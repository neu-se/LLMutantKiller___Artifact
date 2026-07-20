import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle end correctly', () => {
    const source = () => {
      return (end: any, cb: any) => {
        cb(true, null);
      };
    };

    const callback = jest.fn();

    const reducer = reduce((acc: any, data: any) => acc + data, null, callback);
    reducer(source());

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, null);
  });
});