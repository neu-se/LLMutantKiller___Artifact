import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain abort behavior', () => {
  it('should abort with truthy value when op returns false', (done) => {
    let abortValue: any = null;
    const mockRead = (abort: any, cb: (end: any, data?: any) => void) => {
      abortValue = abort;
      cb(true);
    };

    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    const sink = drain((data: any) => {
      return false;
    }, () => {
      // Done callback
    });

    // Simulate the sink being called with the mock read function
    (sink as any)(mockRead);

    // The abort should be called with a truthy value (true in original, but false in mutant)
    setTimeout(() => {
      // In the original code, abortValue should be true (from abort || true)
      // In the mutant code, abortValue would be false (from abort && true)
      if (abortValue === true) {
        done();
      } else {
        done(new Error(`Expected abort to be called with true, but got ${abortValue}`));
      }
    }, 10);
  });
});