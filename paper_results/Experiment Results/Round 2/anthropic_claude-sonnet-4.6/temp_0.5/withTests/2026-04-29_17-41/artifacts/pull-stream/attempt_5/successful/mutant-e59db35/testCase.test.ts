import flatten from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js';
import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('flatten', () => {
  it('abort callback receives true error (not null) when aborting with active nested stream that cleanly ends', (done) => {
    // Use a custom inner stream that cleanly acks abort with null error
    function makeInnerStream() {
      return function(abort: any, cb: (err: any, data?: any) => void) {
        if (abort) {
          // Ack abort with null error (no error occurred)
          cb(null);
        } else {
          cb(null, 42);
        }
      };
    }

    let outerDone = false;
    function outerSource(abort: any, cb: (err: any, data?: any) => void) {
      if (abort) {
        outerDone = true;
        cb(abort);
        return;
      }
      cb(null, makeInnerStream());
    }

    const read = flatten()(outerSource);

    // First read to set _read
    read(null, (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(42);

      // Abort now - inner stream will ack with err=null
      // Original: read(null || true, cb) = read(true, cb) -> outerDone=true, cb(true)
      // Mutated:  read(null && true, cb) = read(null, cb) -> outerDone=false, cb(null, innerStream)
      read(true, (abortErr: any) => {
        expect(outerDone).toBe(true);
        expect(abortErr).toBeTruthy();
        done();
      });
    });
  });
});