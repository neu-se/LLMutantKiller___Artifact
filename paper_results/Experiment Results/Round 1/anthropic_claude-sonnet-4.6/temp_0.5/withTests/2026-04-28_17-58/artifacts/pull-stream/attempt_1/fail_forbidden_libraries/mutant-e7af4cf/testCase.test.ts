import { describe, it, expect } from '@jest/globals';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter through - sync loop behavior', () => {
  it('should handle large numbers of filtered items from a synchronous source without stack overflow', (done) => {
    // Create a synchronous source that produces many items
    // Most items will be filtered out, requiring many iterations
    const TOTAL = 100000;
    let i = 0;
    
    // Synchronous source: returns numbers 0..TOTAL-1
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) return cb(end);
      if (i >= TOTAL) return cb(true);
      cb(null, i++);
    };
    
    // Only pass the last item (index TOTAL-1), filtering out all others
    // This forces the filter to loop/recurse TOTAL-1 times synchronously
    const filterFn = filter((d: number) => d === TOTAL - 1);
    
    const filteredRead = filterFn(source);
    
    // Read one item - should get TOTAL-1
    filteredRead(null, (end: any, data: any) => {
      if (end) {
        done(new Error('Unexpected end: ' + end));
        return;
      }
      expect(data).toBe(TOTAL - 1);
      
      // Read again - should get end of stream
      filteredRead(null, (end2: any) => {
        expect(end2).toBe(true);
        done();
      });
    });
  });
});