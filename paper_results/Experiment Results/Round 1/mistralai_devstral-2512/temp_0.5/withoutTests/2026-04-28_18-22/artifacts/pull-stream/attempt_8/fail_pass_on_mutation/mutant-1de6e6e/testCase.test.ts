const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should handle stream end with non-true value', (done) => {
    const reducer = (acc: number | null, data: number) => (acc || 0) + data;
    const source = (abort: any, cb: (end: boolean | Error, data?: number) => void) => {
      cb(false, 42);
      cb('error'); // End with error string
    };

    reduce(reducer, 0, (err: Error | null, result: number | null) => {
      expect(err).toBe('error');
      expect(result).toBe(42);
      done();
    })(source);
  });
});