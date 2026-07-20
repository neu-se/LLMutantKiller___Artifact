import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle end event correctly', () => {
    const cb = jest.fn();
    const reducer = (acc: any, data: any) => acc + data;
    const source = (end: any, cb: any) => {
      cb(end, 1);
    };

    const result = reduce(reducer, cb, source);
    result(null, (end: any, data: any) => {
      if (end) return cb(end === true? null : end);
      expect(end).toBeUndefined();
      expect(data).toBe(1);
    });
  });
});