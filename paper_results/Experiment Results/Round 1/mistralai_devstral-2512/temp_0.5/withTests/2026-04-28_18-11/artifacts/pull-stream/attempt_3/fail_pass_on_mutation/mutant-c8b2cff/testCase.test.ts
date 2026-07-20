import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain abort behavior', () => {
  it('should pass abort value correctly when op returns false', (done) => {
    let receivedAbortValue: any = null;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        receivedAbortValue = abort;
        cb(abort);
      } else {
        cb(null, 1);
      }
    };

    const op = (data: any) => {
      return false;
    };

    const doneCallback = (err: any) => {
      expect(receivedAbortValue).toBe(true);
      done();
    };

    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    const sink = drain(op, doneCallback);
    sink(source);
  });
});