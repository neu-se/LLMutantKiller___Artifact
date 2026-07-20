const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should use first data as initial value when only two arguments are provided', (done) => {
    const reducer = (acc: number, data: number) => acc + data;
    const source = (abort: any, cb: (end: any, data?: number) => void) => {
      cb(null, 5); // This should become the initial value
      cb(null, 3);
      cb(true);
    };

    // Test with two arguments (no initial value)
    reduce(reducer, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(8); // 5 (first data as initial) + 3
      done();
    })(source);
  });
});