const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink with immediate end', () => {
  it('should call callback with correct error when source ends with non-true value', (done) => {
    const reducer = (acc: any, data: any) => data;
    const source = (abort: any, cb: any) => {
      cb('error-value', null); // end with non-true value
    };

    reduce(reducer, (err: any, result: any) => {
      expect(err).toBe('error-value'); // Original returns the error, mutant returns null
      expect(result).toBeUndefined();
      done();
    })(source);
  });
});