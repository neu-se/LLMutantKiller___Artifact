import { describe, it, expect } from '@jest/globals';
import take from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';

describe('take terminate with error propagation', () => {
  it('should propagate error from source when terminating with last:true', (done) => {
    const abortError = new Error('source abort error');
    
    // Create a source that returns an error when aborted
    const sourceValues = [1, 2, 3, 4, 5];
    let index = 0;
    const source = function(abort: any, cb: (err: any, data?: any) => void) {
      if (abort) {
        // Return an actual error when aborted
        cb(abortError);
      } else if (index < sourceValues.length) {
        cb(null, sourceValues[index++]);
      } else {
        cb(true);
      }
    };
    
    // take with last:true - stops after first item that fails test (n >= 2)
    const through = take(function(n: number) { return n < 2; }, { last: true });
    const read = through(source);
    
    // First read: gets 1 (passes test)
    read(null, function(end1: any, data1: any) {
      expect(end1).toBeFalsy();
      expect(data1).toBe(1);
      
      // Second read: gets 2 (fails test), but last:true means we get it anyway
      // ended is set to true, cb(null, 2) is called
      read(null, function(end2: any, data2: any) {
        expect(end2).toBeFalsy();
        expect(data2).toBe(2);
        
        // Third read: ended is true, last is true, so terminate(cb) is called
        // terminate calls read(true, ...) which returns abortError
        // original: cb(abortError || true) = cb(abortError)
        // mutated:  cb(true)
        read(null, function(end3: any, data3: any) {
          // Original code: end3 should be abortError
          // Mutated code: end3 would be true
          expect(end3).toBe(abortError);
          expect(data3).toBeUndefined();
          done();
        });
      });
    });
  });
});