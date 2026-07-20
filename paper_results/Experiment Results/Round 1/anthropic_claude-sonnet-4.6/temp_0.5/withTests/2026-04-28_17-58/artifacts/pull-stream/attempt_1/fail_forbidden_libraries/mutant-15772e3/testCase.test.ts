import { describe, it, expect } from '@jest/globals';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter through - async source behavior', () => {
  it('should correctly handle filtered items from an async source without hanging', (done) => {
    // Create an async source that calls back on next tick
    // This ensures sync=false matters: the read callback fires after sync is set
    const values = [1, 2, 3, 4, 5];
    let i = 0;

    function asyncSource(end: any, cb: (end: any, data?: any) => void) {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      const val = values[i++];
      // Use setImmediate to make it async - callback fires after sync=false would be set
      setImmediate(() => cb(null, val));
    }

    // Filter: only pass even numbers (1, 3, 5 will be filtered out)
    const filterFn = filter((x: number) => x % 2 === 0);
    const filteredSource = filterFn(asyncSource);

    const results: number[] = [];

    function readNext() {
      filteredSource(null, (end: any, data: any) => {
        if (end === true) {
          // Stream ended normally
          expect(results).toEqual([2, 4]);
          done();
          return;
        }
        if (end) {
          done(end);
          return;
        }
        results.push(data);
        readNext();
      });
    }

    readNext();

    // Timeout to detect hangs (mutated code would hang when filtering async items)
    const timeout = setTimeout(() => {
      done(new Error('Test timed out - stream likely hung due to mutation'));
    }, 2000);

    // Clean up timeout if test completes
    const originalDone = done;
    // Override done to clear timeout - we handle this via the timeout itself
    // The timeout will fire and fail the test if the stream hangs
    void timeout; // referenced to avoid lint warning
  });
});