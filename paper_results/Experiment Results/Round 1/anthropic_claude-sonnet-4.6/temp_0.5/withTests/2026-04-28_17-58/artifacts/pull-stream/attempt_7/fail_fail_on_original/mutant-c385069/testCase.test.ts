import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap abort when not busy', () => {
  it('should call the read callback with abort error not source end when source ends normally during abort', (done) => {
    const abortError = new Error('abort');
    
    let pendingReadCb: ((...args: any[]) => void) | null = null;

    // Source: hangs on normal reads, when aborted responds with true (normal end)
    function source(abort: any, cb: (...args: any[]) => void) {
      if (abort) {
        // Source ends "normally" rather than with abort error
        cb(true);
      } else {
        // Hang
        pendingReadCb = cb;
      }
    }

    const mapFn = asyncMap(function(data: any, cb: (...args: any[]) => void) {
      cb(null, data);
    });

    const read = mapFn(source);

    // Start a read that hangs (busy=false, waiting for source)
    read(null, function(end: any, data: any) {
      // With original: end should be abortError (from cb(abort) in !busy branch)
      // With mutated: end is true (from source normal end, since else branch
      //   calls read(abort,...) but the FIRST pending read gets cb(true))
      expect(end).toBe(abortError);
      done();
    });

    // Abort while not busy - source is hanging
    read(abortError, function(err: any) {
      // abort ack
    });
  });
});