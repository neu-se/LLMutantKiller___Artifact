const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink with immediate end', () => {
  it('should call callback with correct value when source ends immediately with true', (done) => {
    const reducer = (acc: any, data: any) => data;
    const source = (abort: any, cb: any) => {
      cb(true, 'test-value'); // end immediately with true and some data
    };

    reduce(reducer, (err: any, result: any) => {
      expect(err).toBeNull();
      expect(result).toBe('test-value'); // Original returns the data, mutant returns null
      done();
    })(source);
  });
});