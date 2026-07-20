const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should handle empty stream differently when called with two vs three arguments', (done) => {
    const reducer = (acc: number, data: number) => acc + data;
    const source = (abort: any, cb: (end: any, data?: number) => void) => {
      cb(true); // Empty stream
    };

    // Test with two arguments (no initial value)
    reduce(reducer, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBeNull(); // Should be null for empty stream with no initial value
      done();
    })(source);
  });
});