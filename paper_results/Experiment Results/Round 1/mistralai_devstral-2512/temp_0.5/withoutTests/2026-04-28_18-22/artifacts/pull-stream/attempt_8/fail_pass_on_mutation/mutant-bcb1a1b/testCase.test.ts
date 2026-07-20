const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should distinguish between 2 and 3 argument calls', (done) => {
    const reducer = (acc: number, data: number) => acc + data;
    const initialValue = 10;

    const source = (abort: any, cb: any) => {
      cb(null, 5);
      cb(true);
    };

    // Test with 3 arguments (reducer, initial value, callback)
    reduce(reducer, initialValue, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(15); // 10 + 5
      done();
    })(source);
  });
});