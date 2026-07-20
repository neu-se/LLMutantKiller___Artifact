const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should handle end signal with error correctly', (done) => {
    const reducer = (acc: number | null, data: number): number => {
      return acc === null ? data : acc + data;
    };

    const error = new Error('Test error');
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(error); // End with error
    };

    reduce(reducer, null, (err: any, result: number | null) => {
      expect(err).toBe(error);
      expect(result).toBeNull();
      done();
    })(source);
  });
});