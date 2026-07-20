import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('reduce with immediate end and error', () => {
  it('should handle immediate end with error correctly', (done) => {
    const error = new Error('test error');
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(error); // End immediately with error
    };

    const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

    reduce((acc: number, data: number) => acc + data, (err: any, result: number) => {
      expect(err).toBe(error);
      expect(result).toBeUndefined();
      done();
    })(source);
  });
});