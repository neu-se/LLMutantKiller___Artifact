import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should call cb with error when end is true', () => {
    const cb = jest.fn();
    const reducer = (acc: any, data: any) => acc + data;
    const source = (end: any, cb: any) => cb(true, 'data');
    const result = reduce(reducer, cb);
    result(source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, undefined);
  });

  it('should call cb with reduced value when end is not true', () => {
    const cb = jest.fn();
    const reducer = (acc: any, data: any) => acc + data;
    const source = (end: any, cb: any) => cb(null, 'data');
    const result = reduce(reducer, cb);
    result(source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 'data');
  });
});