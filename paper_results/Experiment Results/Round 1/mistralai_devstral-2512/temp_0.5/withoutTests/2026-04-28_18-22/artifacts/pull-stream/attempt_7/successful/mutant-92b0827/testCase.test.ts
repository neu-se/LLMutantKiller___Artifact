const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink with immediate end', () => {
  it('should call callback with correct error when source ends with non-true value', (done) => {
    const reducer = (acc: any, data: any) => data;
    const source = (end: any, cb: (end: any, data: any) => void) => {
      cb('error', null);
    };

    const sink = reduce(reducer, (err: any, result: any) => {
      expect(err).toBe('error');
      expect(result).toBeUndefined();
      done();
    });

    sink(source);
  });
});