const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should handle stream end with true value and verify callback behavior', (done) => {
    const reducer = (acc: number | null, data: number) => (acc || 0) + data;
    let callbackCalled = false;
    const source = (abort: any, cb: (end: boolean | Error, data?: number) => void) => {
      cb(false, 5);
      cb(true); // End with true
    };

    reduce(reducer, 0, (err: Error | null, result: number | null) => {
      callbackCalled = true;
      expect(err).toBeNull();
      expect(result).toBe(5);
      expect(callbackCalled).toBe(true);
      done();
    })(source);
  });
});