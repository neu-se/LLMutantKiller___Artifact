const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink with immediate end', () => {
  it('should call callback with null when source ends immediately with true', (done) => {
    const reducer = (acc: any, data: any) => data;
    const source = (abort: any, cb: (end: boolean, data: any) => void) => {
      cb(true, null);
    };

    const sink = reduce(reducer, (err: any, result: any) => {
      expect(err).toBeNull();
      expect(result).toBeUndefined();
      done();
    });

    sink(source);
  });
});