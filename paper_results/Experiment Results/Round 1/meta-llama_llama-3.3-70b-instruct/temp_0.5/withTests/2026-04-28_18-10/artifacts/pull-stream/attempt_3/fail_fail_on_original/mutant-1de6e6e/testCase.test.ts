import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should call cb with error when end is true and no initial value', () => {
    const cb = jest.fn();
    const reducer = (acc: any, current: any) => acc + current;
    const source = (end: any, cb: any) => {
      cb(true, 'data');
    };
    const result = reduce(reducer, null, cb);
    result(source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, null);
  });

  it('should call cb with data when end is false and no initial value', () => {
    const cb = jest.fn();
    const reducer = (acc: any, current: any) => acc + current;
    const source = (end: any, cb: any) => {
      cb(null, 'data');
    };
    const result = reduce(reducer, null, cb);
    result(source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 'data');
  });
});