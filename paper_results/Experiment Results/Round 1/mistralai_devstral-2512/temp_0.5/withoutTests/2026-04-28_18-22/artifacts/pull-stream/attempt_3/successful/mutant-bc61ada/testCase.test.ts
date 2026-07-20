const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink with immediate end', () => {
  it('should call callback with null when source ends immediately with true', (done) => {
    const reducer = (acc: any, data: any) => acc + data;
    const source = (abort: any, cb: any) => {
      cb(true); // End immediately with true
    };

    reduce(reducer, (err: any, result: any) => {
      expect(err).toBeNull();
      expect(result).toBeUndefined();
      done();
    })(source);
  });
});