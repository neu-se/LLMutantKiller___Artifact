import { describe, it, expect } from '@jest/globals';
import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap with no map function (identity behavior)', () => {
  it('should pass data through unchanged when called with no argument', (done) => {
    // asyncMap(null) should return the identity through - passing data unchanged
    const through = asyncMap(null);

    // Create a simple source that emits values [1, 2, 3] then ends
    const values = [1, 2, 3];
    let i = 0;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // Apply the through-stream (identity)
    const read = through(source);

    // read should be a function (not undefined) in the original
    expect(typeof read).toBe('function');

    // Collect all values
    const collected: number[] = [];

    const drain = () => {
      read(null, (end: any, data?: any) => {
        if (end === true) {
          // Stream ended normally
          expect(collected).toEqual([1, 2, 3]);
          done();
        } else if (end) {
          done(end);
        } else {
          collected.push(data);
          drain();
        }
      });
    };

    drain();
  });
});