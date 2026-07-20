import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap abort when not busy', () => {
  it('should call abort callback with abort error even when source ends normally', (done) => {
    const abortError = new Error('abort');
    let readCallback: Function | null = null;

    // Source that hangs on normal reads but when aborted, 
    // calls back with true (normal end) instead of the abort error
    function source(abort: any, cb: Function) {
      if (abort) {
        // Source ends "normally" (true) rather than with the abort error
        cb(true);
      } else {
        // Hang - store callback to simulate async
        readCallback = cb;
      }
    }

    const mapFn = asyncMap(function(data: any, cb: Function) {
      cb(null, data * 2);
    });

    const read = mapFn(source);

    // Trigger a read that hangs (busy=false, waiting for source)
    read(null, function(end: any, data: any) {
      // This should get the abort error, not true
      expect(end).toBe(abortError);
      done();
    });

    // Now abort while the source is hanging (busy=false)
    read(abortError, function(err: any) {
      // abort callback
    });

    // Resolve the hanging source read with normal end
    if (readCallback) {
      readCallback(true);
    }
  });
});