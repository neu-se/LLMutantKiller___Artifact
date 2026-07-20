import { describe, it, expect } from '@jest/globals';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter through', () => {
  it('should correctly filter items from an async source without losing data', (done) => {
    // Create an async source that yields values asynchronously
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let i = 0;
    
    function asyncSource(end: any, cb: (end: any, data?: any) => void) {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      const val = values[i++];
      // Make it async using setImmediate
      setImmediate(() => cb(null, val));
    }
    
    // Filter to only keep even numbers
    const filteredRead = filter((d: number) => d % 2 === 0)(asyncSource);
    
    const results: number[] = [];
    
    function drain(end: any, data?: any) {
      if (end === true) {
        // Stream ended normally
        expect(results).toEqual([2, 4, 6, 8, 10]);
        done();
        return;
      }
      if (end) {
        done(end);
        return;
      }
      results.push(data);
      filteredRead(null, drain);
    }
    
    filteredRead(null, drain);
  });
});