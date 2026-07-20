import * as reduceModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js"

describe('reduce function', () => {
  it('should return the correct result when accumulator is provided and there are two arguments', () => {
    const reducer = (acc: number, current: number) => acc + current;
    const initialAcc = 0;
    const input = [1, 2, 3, 4, 5];
    let result: number | null = null;
    let error: Error | null = null;

    const cb = (err: Error | null, acc: number) => {
      error = err;
      result = acc;
    };

    const reduce = reduceModule.default;
    const sink = reduce(reducer, cb);
    input.forEach((value) => {
      sink(null, (end, data) => {
        if (end === true) return;
        if (end) return cb(end);
        sink(end, (end, data) => {
          if (end === true) return cb(null, data);
          if (end) return cb(end);
        });
      });
    });
    sink(true, (end, data) => {
      if (end === true) return cb(null, data);
      if (end) return cb(end);
    });

    expect(error).toBeNull();
    expect(result).toBe(15);
  });
});