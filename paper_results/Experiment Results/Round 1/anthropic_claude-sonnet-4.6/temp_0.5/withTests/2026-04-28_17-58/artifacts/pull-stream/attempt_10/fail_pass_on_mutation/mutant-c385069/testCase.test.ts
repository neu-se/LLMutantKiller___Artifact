import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap abort when not busy', () => {
  it('abort callback is called even when source triggers a map during abort acknowledgment', (done) => {
    const abortError = new Error('abort');
    let mapCb: ((...args: any[]) => void) | null = null;
    let callCount = 0;

    // Source: when aborted, synchronously provides data first then ends
    // This simulates a source that sends one more item before acknowledging abort
    function source(abort: any, cb: (...args: any[]) => void) {
      if (abort) {
        // Synchronously call back with data (not abort) - simulating a race
        // This will trigger the map, making busy=true
        cb(null, 99);
      } else {
        // Normal read: hang
      }
    }

    const mapFn = asyncMap(function(data: any, cb: (...args: any[]) => void) {
      // Store map callback - don't complete yet
      mapCb = cb;
    });

    const read = mapFn(source);

    // Start a read that hangs (not busy)
    read(null, function(end: any, data: any) {
      callCount++;
    });

    // Abort while not busy
    // Original (!busy path): read(abort, fn_A) → source gives data → map starts
    //   fn_A calls cb(abort) regardless → abort callback fires ✓
    // Mutated (else path): read(abort, fn_B) → source gives data → map starts (busy=true)
    //   fn_B sees busy=true → sets abortCb=cb → abort callback NOT called yet
    read(abortError, function(err: any) {
      expect(err).toBe(abortError);
      done();
    });

    // Complete the map - in mutated code, abortCb should fire here
    // But in original, abort cb already fired before map completed
    if (mapCb) (mapCb as any)(null, 99);
  });
});