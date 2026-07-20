import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should behave correctly with two and three arguments', () => {
    const reducer = (acc: any, data: any) => acc + data;
    const cb = (err: any, result: any) => {
      if (err) throw err;
      expect(result).toBe('data');
    };

    // Test with 2 arguments (reducer and cb)
    const result1 = reduce(reducer, cb);
    expect(typeof result1).toBe('function');

    // Test with 3 arguments (reducer, acc, and cb)
    const result2 = reduce(reducer, 0, cb);
    expect(typeof result2).toBe('function');

    // This should fail on the mutated code
    result1((end: any, data: any) => {
      if (end === true) return;
      expect(end).toBe(null);
      expect(data).toBeUndefined();
    });

    result2((end: any, data: any) => {
      if (end === true) return;
      expect(end).toBe(null);
      expect(data).toBeUndefined();
    });
  });
});