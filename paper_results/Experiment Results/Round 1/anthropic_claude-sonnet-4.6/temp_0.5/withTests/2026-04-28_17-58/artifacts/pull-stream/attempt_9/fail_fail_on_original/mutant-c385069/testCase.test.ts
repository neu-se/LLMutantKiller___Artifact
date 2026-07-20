import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap abort when not busy', () => {
  it('should call the pending read callback before the abort callback when source is slow', (done) => {
    const abortError = new Error('abort');
    let sourceAbortCb: ((...args: any[]) => void) | null = null;

    // Source: hangs on normal reads, slow to ack abort
    let readCount = 0;
    function source(abort: any, cb: (...args: any[]) => void) {
      if (abort) {
        sourceAbortCb = cb;
      } else {
        // hang - never calls cb for normal reads
      }
    }

    const mapFn = asyncMap(function(data: any, cb: (...args: any[]) => void) {
      cb(null, data);
    });

    const read = mapFn(source);

    let firstReadCallbackCalled = false;

    // Start a read that hangs (not busy)
    read(null, function(end: any, data: any) {
      firstReadCallbackCalled = true;
      expect(end).toBe(abortError);
    });

    // Abort while not busy
    read(abortError, function(err: any) {
      // In original: first read cb was called (with abort), then this
      // In mutated: first read cb never called (source never resolved it)
      expect(firstReadCallbackCalled).toBe(true);
      expect(err).toBe(abortError);
      done();
    });

    // Source slowly acks the abort
    if (sourceAbortCb) (sourceAbortCb as any)(abortError);
  });
});