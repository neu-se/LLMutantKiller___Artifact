import * as reduceModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle end event correctly', () => {
    const reducer = (acc: any, data: any) => acc + data;
    const cb = jest.fn();
    const source = (end: any, cb: any) => {
      cb(null, 1);
    };

    const reduce = reduceModule.default;
    const result = reduce(reducer, cb, source);
    result(null, (end, data) => {
      if (end === true) return cb(null);
      if (end) return cb(end);
      expect(end).toBeUndefined();
      expect(data).toBe(1);
    });
  });
});