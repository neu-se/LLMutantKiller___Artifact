const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should use initial value when called with 2 arguments', (done) => {
    const reducer = (acc: number, data: number) => acc + data;
    const initialValue = 10;

    const source = (abort: any, cb: any) => {
      cb(null, 5);
      cb(true);
    };

    // Call with 2 arguments (reducer and initial value)
    const sink = reduce(reducer, initialValue);
    sink(source, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(15); // 10 + 5
      done();
    });
  });
});