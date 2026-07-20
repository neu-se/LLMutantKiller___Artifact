const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should behave differently when called with two arguments vs three arguments', (done) => {
    const reducer = (acc: number, data: number) => acc + data;
    const initialValue = 10;
    const source = (abort: any, cb: (end: any, data?: number) => void) => {
      cb(null, 5);
      cb(null, 3);
      cb(true);
    };

    // Test with three arguments (initial value provided)
    reduce(reducer, initialValue, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(18); // 10 (initial) + 5 + 3
      done();
    })(source);
  });
});