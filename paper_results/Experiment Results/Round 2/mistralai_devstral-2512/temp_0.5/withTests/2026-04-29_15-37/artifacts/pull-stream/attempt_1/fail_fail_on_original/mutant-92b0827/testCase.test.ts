import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("reduce with immediate end and no initial value", () => {
  it("should callback with null when stream ends immediately with true", (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(true); // End immediately with true
    };

    reduce((acc: any, data: any) => acc + data, (err: any, result: any) => {
      expect(err).toBeNull();
      expect(result).toBeNull();
      done();
    })(source);
  });
});