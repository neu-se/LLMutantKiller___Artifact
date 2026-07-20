import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle ended stream with no initial value correctly', () => {
    const cb = jest.fn();
    const source = (err: any, cb: any) => {
      cb(true, null);
    };
    const reducer = (acc: any, data: any) => data;
    const result = reduce(reducer, null, cb);
    result(source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, null);
  });
});