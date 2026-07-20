const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should handle end signal with non-true value correctly', (done) => {
    const reducer = (acc: number | null, data: number): number => {
      return acc === null ? data : acc + data;
    };

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(null, 5);
      cb('error'); // End with non-true value
    };

    reduce(reducer, null, (err: any, result: number | null) => {
      expect(err).toBe('error');
      expect(result).toBe(5);
      done();
    })(source);
  });
});