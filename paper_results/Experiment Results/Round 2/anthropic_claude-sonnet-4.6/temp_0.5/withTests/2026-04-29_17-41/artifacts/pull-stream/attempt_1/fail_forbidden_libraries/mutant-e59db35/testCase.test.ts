import { describe, it, expect } from '@jest/globals';
import flatten from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js';
import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('flatten abort propagation', () => {
  it('should propagate abort to outer stream when _read is set and inner stream acks abort without error', (done) => {
    const outerAbortCalls: any[] = [];

    // Create an outer source that tracks abort calls
    function outerSource(abort: any, cb: Function) {
      if (abort) {
        outerAbortCalls.push(abort);
        cb(abort);
        return;
      }
      // Return a stream as the first value
      cb(null, values([1, 2, 3]));
    }

    const flattenThrough = flatten();
    const read = flattenThrough(outerSource);

    // First, do a normal read to get the first value (this sets _read internally)
    read(null, (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(1);

      // Now abort the flatten stream
      read(true, (abortErr: any) => {
        // The abort should have been propagated to the outer source
        expect(outerAbortCalls.length).toBe(1);
        expect(outerAbortCalls[0]).toBe(true);
        // The callback should receive the abort signal (true)
        expect(abortErr).toBe(true);
        done();
      });
    });
  });
});