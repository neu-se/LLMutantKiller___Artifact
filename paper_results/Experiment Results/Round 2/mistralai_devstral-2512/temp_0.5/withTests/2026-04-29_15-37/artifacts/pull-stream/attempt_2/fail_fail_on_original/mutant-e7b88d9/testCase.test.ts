import { take } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('take mutation test', () => {
  it('should call callback with ended state when stream is ended', (done) => {
    let callbackCalled = false;
    const testFn = (n: number) => n < 3;
    const takeStream = take(testFn);

    const source = function (abort: any, cb: any) {
      if (abort) {
        cb(abort);
      } else {
        cb(true); // End the stream immediately
      }
    };

    const read = takeStream(source);

    // First read to end the stream
    read(null, function(end: any, data: any) {
      if (end === true) {
        // Now try to read again when ended is true and end is false
        read(null, function(end: any, data: any) {
          callbackCalled = true;
          // In original code: cb(ended) is called, so end should be true
          // In mutated code: nothing happens, so callback is never called
          if (end === true) {
            done();
          } else {
            done(new Error('Expected end to be true'));
          }
        });

        // Set timeout to fail test if callback is never called (mutation case)
        setTimeout(() => {
          if (!callbackCalled) {
            done(new Error('Callback was never called - mutation detected'));
          }
        }, 100);
      } else {
        done(new Error('Expected stream to end'));
      }
    });
  });
});