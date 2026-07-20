import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should behave correctly with two arguments', () => {
    const reducer = (acc: any, data: any) => acc + data;
    const cb = (err: any, result: any) => {
      if (err) throw err;
      expect(result).toBe('data');
    };

    const result = reduce(reducer, cb);
    if (typeof result === 'function') {
      result(null, (end: any, data: any) => {
        if (end) return;
        expect(data).toBe('data');
      });
    }
  });
});