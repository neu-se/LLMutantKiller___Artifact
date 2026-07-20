import * as reduceModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle end event correctly', () => {
    const reducer = (acc: any, data: any) => acc + data;
    const cb = jest.fn();
    const source = (end: any, cb: any) => {
      cb(true, 1);
    };

    const reduce = reduceModule.default;
    const result = reduce(reducer, cb, source);
    result(source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(true, 1);
  });
});