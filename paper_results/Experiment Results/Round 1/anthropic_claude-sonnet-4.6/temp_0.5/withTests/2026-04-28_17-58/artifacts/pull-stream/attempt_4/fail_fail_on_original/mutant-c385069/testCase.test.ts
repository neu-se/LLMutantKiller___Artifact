import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap abort when not busy', () => {
  it('should invoke abort callback after source ends when not busy, even if map completes during abort', (done) => {
    const abortError = new Error('abort');
    let pendingSourceCb: Function | null = null;
    let pendingMapCb: Function | null = null;

    function source(abort: any, cb: Function) {
      if (abort) {
        // Delay the abort acknowledgment
        setTimeout(() => cb(abort), 10);
      } else {
        pendingSourceCb = cb;
        // Immediately provide data
        cb(null, 1);
      }
    }

    const mapFn = asyncMap(function(data: any, cb: Function) {
      // Hold the map callback - don't complete yet
      pendingMapCb = cb;
    });

    const read = mapFn(source);

    // Start a read - source gives data immediately, map is now busy
    read(null, function(end: any, data: any) {
      expect(end).toBeFalsy();
      expect(data).toBe(1);
      done();
    });

    // While busy, abort
    read(abortError, function(abortEnd: any) {
      expect(abortEnd).toBe(abortError);
      done();
    });

    // Complete the map - making busy=false
    if (pendingMapCb) {
      (pendingMapCb as Function)(null, 1);
    }
  });
});