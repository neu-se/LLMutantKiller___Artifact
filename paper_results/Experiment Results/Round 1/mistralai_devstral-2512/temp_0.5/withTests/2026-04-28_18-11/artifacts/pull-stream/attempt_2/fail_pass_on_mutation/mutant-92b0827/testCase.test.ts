import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('reduce with immediate end', () => {
  it('should handle immediate end with no initial value correctly', (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(true); // End immediately with no data
    };

    const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

    reduce((acc: number, data: number) => acc + data, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBeUndefined();
      done();
    })(source);
  });
});