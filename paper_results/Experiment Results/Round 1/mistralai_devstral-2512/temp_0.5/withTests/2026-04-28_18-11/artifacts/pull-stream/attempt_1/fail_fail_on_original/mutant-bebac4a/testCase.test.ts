import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain abort behavior", () => {
  it("should not call read when abort is called before read is set", (done) => {
    let readCalled = false;
    const source = (abort: any, cb: any) => {
      readCalled = true;
      cb(abort);
    };

    const sink = drain(null, () => {
      // This should not be called since we abort before any data is read
    });

    // Call abort before any read operation
    (sink as any).abort();

    // Now try to read - this should not trigger the source's read
    sink(source);

    setImmediate(() => {
      expect(readCalled).toBe(false);
      done();
    });
  });
});