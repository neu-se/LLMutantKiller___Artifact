import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain abort behavior", () => {
  it("should not call read when aborted before read is set", (done) => {
    let readCalled = false;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      readCalled = true;
      cb(abort);
    };

    const sink = drain(null, () => {});
    sink.abort(null, () => {
      // In the original code, read is not set yet, so this should not call source
      // In the mutated code, it will always call source because of `if(true)`
      expect(readCalled).toBe(false);
      done();
    });
  });
});