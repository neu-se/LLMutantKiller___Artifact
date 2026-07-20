const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should handle 2-argument call with initial value', (done) => {
    const reducer = (acc: number, data: number) => acc + data;
    const initialValue = 10;

    const source = (abort: any, cb: any) => {
      cb(null, 5);
      cb(true);
    };

    // Call with 2 arguments (reducer and callback)
    reduce(reducer, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(5); // No initial value, just the data
      done();
    })(source);
  });
});