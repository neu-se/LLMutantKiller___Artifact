const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should return undefined for empty stream when called with two arguments', (done) => {
    const reducer = (acc: number, data: number) => acc + data;
    const source = (abort: any, cb: (end: any, data?: number) => void) => {
      cb(true); // Empty stream
    };

    // Test with two arguments (no initial value)
    reduce(reducer, (err: any, result: any) => {
      expect(err).toBeNull();
      expect(result).toBeUndefined(); // Should be undefined for empty stream with no initial value
      done();
    })(source);
  });
});