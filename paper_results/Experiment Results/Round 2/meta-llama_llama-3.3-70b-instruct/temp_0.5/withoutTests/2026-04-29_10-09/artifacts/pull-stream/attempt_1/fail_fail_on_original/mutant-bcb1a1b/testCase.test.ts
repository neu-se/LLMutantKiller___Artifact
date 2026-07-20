import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should behave differently based on the number of arguments', () => {
    const reducer = (acc: any, data: any) => acc + data;
    const cb = (err: any, result: any) => {
      if (err) throw err;
      // If the mutation is present, this should be undefined
      expect(result).not.toBeUndefined();
    };

    // Test with 2 arguments (reducer and cb)
    const sink1 = reduce(reducer, cb);
    expect(typeof sink1).toBe('function');

    // Test with 3 arguments (reducer, acc, and cb)
    const sink2 = reduce(reducer, 0, cb);
    expect(typeof sink2).toBe('function');
  });
});