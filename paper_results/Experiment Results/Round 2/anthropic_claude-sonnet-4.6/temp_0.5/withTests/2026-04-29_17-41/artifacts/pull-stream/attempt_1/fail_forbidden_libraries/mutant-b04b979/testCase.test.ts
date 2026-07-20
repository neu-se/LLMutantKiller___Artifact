import { describe, it, expect } from '@jest/globals';
import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap with no map function (identity passthrough)', () => {
  it('should pass through the read function unchanged when called with a falsy argument', (done) => {
    // When asyncMap is called with no/falsy argument, it returns the `id` function
    // which should act as identity - returning the read function as-is
    const throughFn = asyncMap(null);

    // Create a simple source that produces values 1, 2, 3 then ends
    const values = [1, 2, 3];
    let index = 0;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      if (index >= values.length) return cb(true);
      cb(null, values[index++]);
    };

    // Apply the through function - in original code, id(source) returns source
    // In mutated code, id(source) returns undefined
    const result = throughFn(source);

    // If mutated, result is undefined and calling it will throw
    // If original, result is the source read function and we can collect values
    expect(result).toBeDefined();
    expect(typeof result).toBe('function');

    // Actually read values to confirm it works as a passthrough
    const collected: any[] = [];

    function readNext() {
      result(null, (end: any, data: any) => {
        if (end === true) {
          // Stream ended normally
          expect(collected).toEqual([1, 2, 3]);
          done();
        } else if (end) {
          done(end);
        } else {
          collected.push(data);
          readNext();
        }
      });
    }

    readNext();
  });
});