import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap abort when not busy', () => {
  it('abort callback should be called exactly once when not busy and source is synchronous', (done) => {
    const abortError = new Error('abort');
    let abortCbCallCount = 0;
    let readCallCount = 0;

    // Synchronous source that immediately ends on abort
    function source(abort: any, cb: (...args: any[]) => void) {
      readCallCount++;
      if (abort) {
        cb(abort);
      } else {
        cb(null, 1);
      }
    }

    const mapFn = asyncMap(function(data: any, cb: (...args: any[]) => void) {
      // synchronous map
      cb(null, data);
    });

    const read = mapFn(source);

    // First read - completes synchronously, busy=false after
    read(null, function(end: any, data: any) {
      expect(end).toBeFalsy();
      expect(data).toBe(1);

      // Now abort - not busy
      read(abortError, function(err: any) {
        abortCbCallCount++;
        expect(err).toBe(abortError);
        expect(abortCbCallCount).toBe(1);
        done();
      });
    });
  });
});