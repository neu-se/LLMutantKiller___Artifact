const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should return different types based on argument count', () => {
    const reducer = (acc: number, data: number) => acc + data;
    const initialValue = 10;

    // Test with 2 arguments (should return a function)
    const result1 = reduce(reducer, initialValue);
    expect(typeof result1).toBe('function');

    // Test with 3 arguments (should return a sink)
    const result2 = reduce(reducer, initialValue, () => {});
    expect(typeof result2).toBe('function');
    expect(result2).not.toBe(result1);
  });
});