import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain mutation test', () => {
  it('should handle true end value in error callback correctly', (done) => {
    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    let callbackCalled = false;

    const source = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
      } else {
        // This will trigger the else if(end && end !== true) branch in original
        // but else if(end && end === true) in mutated code
        cb(true);
      }
    };

    const sink = drain(null, (err: any) => {
      callbackCalled = true;
      // In original code, true end should result in null error
      // In mutated code, true end will be treated as an error
      expect(err).toBeNull();
      done();
    });

    pull(source, sink);

    setTimeout(() => {
      if (!callbackCalled) {
        done(new Error('Callback was not called'));
      }
    }, 100);
  });
});