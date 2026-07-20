const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through onEnd behavior with abort', () => {
  it('should call onEnd with the actual abort value when stream is aborted', (done) => {
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
    const read = pull(
      source,
      throughStream,
      pull.drain(null, () => {})
    );

    // First read
    read(null, (end: any, data: any) => {
      // Then abort with our error
      read(abortError, (end: any) => {
        // Give it time to process
        setImmediate(() => {
          expect(receivedAbortValue).toBe(abortError);
          done();
        });
      });
    });
  });
});