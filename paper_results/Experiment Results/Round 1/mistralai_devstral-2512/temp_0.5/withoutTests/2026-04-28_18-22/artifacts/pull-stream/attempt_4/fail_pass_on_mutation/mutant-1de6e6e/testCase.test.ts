const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should call callback with error when source ends with error', (done) => {
    const reducer = (acc: number | null, data: number) => (acc || 0) + data;
    const error = new Error('Test error');
    const source = (abort: any, cb: (end: boolean | Error, data?: number) => void) => {
      cb(error); // End with error
    };

    reduce(reducer, 0, (err: Error | null, result: number | null) => {
      expect(err).toBe(error);
      expect(result).toBe(0); // Should still return initial value
      done();
    })(source);
  });
});