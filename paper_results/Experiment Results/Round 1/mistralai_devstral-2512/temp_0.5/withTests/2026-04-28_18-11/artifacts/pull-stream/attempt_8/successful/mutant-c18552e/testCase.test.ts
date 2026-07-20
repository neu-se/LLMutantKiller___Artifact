const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through onEnd behavior', () => {
  it('should pass the correct abort value to onEnd', (done) => {
    const abortError = new Error('test abort');
    let receivedAbortValue: any = null;

    const onEnd = (abort: any) => {
      receivedAbortValue = abort;
    };

    const source = (abort: any, cb: any) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 1);
      }
    };

    const throughStream = through(null, onEnd);
    const read = throughStream(source);

    // First read
    read(null, (end: any, data: any) => {
      // Then abort with our error
      read(abortError, (end: any) => {
        setImmediate(() => {
          expect(receivedAbortValue).toBe(abortError);
          done();
        });
      });
    });
  });
});