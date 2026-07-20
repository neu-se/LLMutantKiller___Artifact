import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain abort behavior', () => {
  it('should abort with truthy value when op returns false', (done) => {
    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    let abortValue: any = null;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        abortValue = abort;
        cb(abort);
      } else {
        cb(null, 'data');
      }
    };

    const sink = drain((data: any) => {
      return false;
    }, (err: any) => {
      // In original code, abort should be truthy (true)
      // In mutant code, abort would be falsy (false)
      if (abortValue === true) {
        done();
      } else {
        done(new Error(`Expected abort to be called with true, but got ${abortValue}`));
      }
    });

    // Start the stream
    (sink as any)(source);
  });
});