import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('reduce with immediate end and no initial value', () => {
  it('should return null when stream ends immediately with true', (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(true);
    };

    const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

    reduce((acc: number, data: number) => acc + data, (err: any, result: any) => {
      expect(err).toBeNull();
      expect(result).toBeNull();
      done();
    })(source);
  });
});