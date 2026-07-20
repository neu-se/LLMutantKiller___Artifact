import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap abort when not busy', () => {
  it('should call first read callback with abort error when source is slow to acknowledge abort', (done) => {
    const abortError = new Error('abort');
    let sourceAbortCb: Function | null = null;

    // Source that is slow to acknowledge abort
    function source(abort: any, cb: Function) {
      if (abort) {
        // Store the abort callback - don't call it yet
        sourceAbortCb = cb;
      } else {
        // Immediately return data
        cb(null, 42);
      }
    }

    const mapFn = asyncMap(function(data: any, cb: Function) {
      // Synchronous map - completes immediately, busy becomes false
      cb(null, data);
    });

    const read = mapFn(source);

    let firstReadDone = false;

    // First read - gets data, map completes synchronously, busy=false
    read(null, function(end: any, data: any) {
      firstReadDone = true;
      // This callback is called when the second read triggers abort propagation
      expect(end).toBe(abortError);
    });

    // Second read - source hangs (not busy)
    // Now abort
    read(abortError, function(err: any) {
      expect(err).toBe(abortError);
      expect(firstReadDone).toBe(true);
      done();
    });

    // Now resolve the source abort slowly
    expect(sourceAbortCb).not.toBeNull();
    (sourceAbortCb as Function)(abortError);
  });
});