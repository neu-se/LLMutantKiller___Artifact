import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain mutation test', () => {
  it('should handle error end value correctly', (done) => {
    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    const error = new Error('test error');
    let callbackCalled = false;

    const source = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
      } else {
        // This will trigger the else if(end && end !== true) branch in original
        // but won't trigger else if(end && end === true) in mutated code
        cb(error);
      }
    };

    const sink = drain(null, (err: any) => {
      callbackCalled = true;
      // In original code, error should be passed through
      // In mutated code, this branch won't be taken and error handling will be different
      expect(err).toBe(error);
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