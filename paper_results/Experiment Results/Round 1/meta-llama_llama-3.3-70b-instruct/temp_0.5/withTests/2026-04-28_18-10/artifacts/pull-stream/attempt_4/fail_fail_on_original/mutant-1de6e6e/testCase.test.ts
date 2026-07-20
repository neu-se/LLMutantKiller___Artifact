import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should call cb with error when end is true and no initial value', () => {
    const cb = jest.fn();
    const reducer = (acc: any, current: any) => acc + current;
    const source = (end: any, cb: any) => {
      if (end) {
        cb(end, null);
      } else {
        cb(null, 1);
      }
    };
    const result = reduce(reducer, cb);
    result(source);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});