const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should use first data as initial value when called with two arguments', (done) => {
    const reducer = (acc: number, data: number) => acc + data;
    const source = (abort: any, cb: (end: any, data?: number) => void) => {
      cb(null, 5); // First data becomes initial value
      cb(null, 3);
      cb(true);
    };

    // Call with two arguments (reducer and callback)
    reduce(reducer, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(8); // 5 (first data) + 3
      done();
    })(source);
  });
});