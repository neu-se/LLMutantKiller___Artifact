// Jest test file
import { describe, it, expect } from '@jest/globals';
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should stream array values without including non-index properties', (done) => {
    const arr = [1, 2, 3];
    (arr as any).extra = 99;
    
    const read = values(arr);
    const results: number[] = [];
    
    function drain(end: any, data: any) {
      if (end === true) {
        expect(results).toEqual([1, 2, 3]);
        done();
        return;
      }
      if (end) { done(end); return; }
      results.push(data);
      read(null, drain);
    }
    
    read(null, drain);
  });
});