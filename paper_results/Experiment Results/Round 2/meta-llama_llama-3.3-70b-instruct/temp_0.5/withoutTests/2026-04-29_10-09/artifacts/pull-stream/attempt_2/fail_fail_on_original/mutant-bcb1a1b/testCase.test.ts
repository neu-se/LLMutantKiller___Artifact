import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should return a function with two arguments and behave correctly', () => {
    const reducer = (acc: any, data: any) => acc + data;
    const cb = (err: any, result: any) => {
      if (err) throw err;
    };

    // Test with 2 arguments (reducer and cb)
    const result = reduce(reducer, cb);
    expect(typeof result).toBe('function');

    // Test the returned function
    const source = (err: any, cb: any) => {
      cb(null, 'data');
    };
    result(source);

    // Test with 3 arguments (reducer, acc, and cb)
    const result2 = reduce(reducer, 0, cb);
    expect(typeof result2).toBe('function');
  });
});