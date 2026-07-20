const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should handle initial value when called with 2 arguments', (done) => {
    const reducer = (acc: number, data: number) => acc + data;
    const initialValue = 10;
    const expectedResult = 15;

    const source = (abort: any, cb: any) => {
      cb(null, 5);
      cb(true);
    };

    reduce(reducer, initialValue, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(expectedResult);
      done();
    })(source);
  });
});