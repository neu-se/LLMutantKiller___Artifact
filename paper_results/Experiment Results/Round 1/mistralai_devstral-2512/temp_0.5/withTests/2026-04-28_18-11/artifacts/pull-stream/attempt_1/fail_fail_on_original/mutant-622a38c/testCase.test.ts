import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('reduce with immediate end and no initial value', () => {
  it('should call callback with null error when stream ends immediately', (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(true); // End immediately with no data
    };

    reduce((acc: any, data: any) => acc + data, (err: any, result: any) => {
      expect(err).toBeNull();
      expect(result).toBeUndefined();
      done();
    })(source);
  });
});