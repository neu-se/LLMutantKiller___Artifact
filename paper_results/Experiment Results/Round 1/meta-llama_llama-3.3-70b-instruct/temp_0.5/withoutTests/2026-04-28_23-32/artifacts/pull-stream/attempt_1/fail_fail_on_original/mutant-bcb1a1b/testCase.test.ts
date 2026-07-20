import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle the case where only two arguments are provided', () => {
    const reducer = (acc: number, data: number) => acc + data;
    const cb = (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(10);
    };
    const source = (end: any, data: number) => {
      if (end) return;
      source(null, 5);
      source(true);
    };
    reduce(reducer, 5, cb)(source);
  });
});