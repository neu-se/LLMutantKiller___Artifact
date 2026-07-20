const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should handle 2-argument call differently from 3-argument call', (done) => {
    const reducer = (acc: number, data: number) => acc + data;
    const initialValue = 10;

    // Test with 2 arguments (should use initial value)
    const source = (abort: any, cb: any) => {
      cb(null, 5);
      cb(true);
    };

    reduce(reducer, initialValue, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(15); // 10 + 5
      done();
    })(source);
  });
});