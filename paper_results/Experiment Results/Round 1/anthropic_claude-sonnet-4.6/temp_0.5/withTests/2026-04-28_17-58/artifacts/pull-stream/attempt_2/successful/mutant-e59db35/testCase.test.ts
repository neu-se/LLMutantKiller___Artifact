import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe('flatten abort with active inner stream', () => {
  it('should propagate abort to outer stream when inner stream cleanly acknowledges abort', (done) => {
    let outerAbortReceived: any = undefined;

    // Inner stream: always has data, cleanly acks abort with null error
    const innerStream = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) {
        // Clean acknowledgment: err = null (not the abort value)
        cb(null);
        return;
      }
      cb(null, 99);
    };

    // Outer stream: yields inner stream once, tracks if abort is received
    let outerCallCount = 0;
    const outerStream = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) {
        outerAbortReceived = abort;
        cb(abort);
        return;
      }
      outerCallCount++;
      if (outerCallCount === 1) {
        cb(null, innerStream);
      } else {
        cb(true);
      }
    };

    const flattenThrough = flatten();
    const read = flattenThrough(outerStream);

    // First read: sets _read = innerStream internally
    read(null, (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(99);

      // Now abort: _read(abort, cb) calls cb(null), then original does read(null || abort, cb) = read(abort, cb)
      // Mutated does read(null && abort, cb) = read(null, cb) which does NOT abort outer
      const abortSignal = new Error('intentional abort');
      read(abortSignal, (_err: any) => {
        // Give a tick for any async propagation
        setImmediate(() => {
          expect(outerAbortReceived).toBe(abortSignal);
          done();
        });
      });
    });
  });
});