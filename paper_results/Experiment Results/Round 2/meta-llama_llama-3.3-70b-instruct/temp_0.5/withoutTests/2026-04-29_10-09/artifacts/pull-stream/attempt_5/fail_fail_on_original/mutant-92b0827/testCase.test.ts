import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle ended stream with error correctly', () => {
    const cb = jest.fn();
    const source = (err: any, cb: any) => {
      cb(true, 'error');
    };
    const reducer = (acc: any, data: any) => data;
    const result = reduce(reducer, cb);
    result(source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith('error', null);
  });
});