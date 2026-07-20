import { describe, it, expect } from '@jest/globals';
import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take terminate error propagation', () => {
  it('should propagate upstream error when terminating with last:true', (done) => {
    const upstreamError = new Error('upstream abort error');
    
    // Source that returns an error when aborted
    let i = 0;
    const values = [1, 2, 3, 4, 5];
    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        // Return an actual error when aborted
        cb(upstreamError);
      } else if (i >= values.length) {
        cb(true);
      } else {
        cb(null, values[i++]);
      }
    }
    
    // take with last:true - will call terminate() when test returns false
    const through = take((n: number) => n < 3, { last: true });
    const read = through(source);
    
    const results: number[] = [];
    
    function drain(end: any, data?: any) {
      if (end) {
        // The error should be the upstream error, not just `true`
        expect(end).toBe(upstreamError);
        done();
        return;
      }
      results.push(data);
      read(null, drain);
    }
    
    read(null, drain);
  });
});