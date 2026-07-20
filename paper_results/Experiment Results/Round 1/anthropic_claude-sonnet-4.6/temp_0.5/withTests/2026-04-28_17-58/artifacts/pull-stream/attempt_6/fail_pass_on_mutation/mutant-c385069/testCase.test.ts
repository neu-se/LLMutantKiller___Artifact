import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap abort when not busy', () => {
  it('should call abort callback immediately when not busy, even if a concurrent read starts a map', (done) => {
    const abortError = new Error('abort');
    
    let sourceAbortCb: ((...args: any[]) => void) | null = null;
    let mapCb: ((...args: any[]) => void) | null = null;
    let readCb: ((...args: any[]) => void) | null = null;

    // Source: on normal read, hangs. On abort, hangs too (stores cb).
    function source(abort: any, cb: (...args: any[]) => void) {
      if (abort) {
        sourceAbortCb = cb;
      } else {
        readCb = cb;
      }
    }

    const mapFn = asyncMap(function(data: any, cb: (...args: any[]) => void) {
      // Hang the map
      mapCb = cb;
    });

    const read = mapFn(source);

    // Step 1: Start a normal read - source hangs, busy=false
    read(null, function(end: any, data: any) {
      // not expected to be called in this test
    });

    // Step 2: Abort while not busy (source is hanging on normal read)
    // In original: takes !busy path, calls read(abort, fn_A)
    // In mutated: takes else path, calls read(abort, fn_B)
    read(abortError, function(err: any) {
      expect(err).toBe(abortError);
      done();
    });

    // Step 3: Source responds to the normal read with data
    // This triggers the map (busy becomes true)
    if (readCb) readCb(null, 42);

    // Step 4: Source responds to abort
    // In original (fn_A): calls cb(abort) regardless of busy
    // In mutated (fn_B): busy=true now, so sets abortCb=cb, never calls done()
    if (sourceAbortCb) sourceAbortCb(abortError);

    // Step 5: Complete the map
    if (mapCb) mapCb(null, 42);
  });
});