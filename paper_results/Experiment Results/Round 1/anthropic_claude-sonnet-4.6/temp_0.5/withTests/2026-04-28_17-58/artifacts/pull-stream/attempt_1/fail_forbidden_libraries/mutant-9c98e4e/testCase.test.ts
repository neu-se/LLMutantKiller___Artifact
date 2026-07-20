import { describe, it, expect } from '@jest/globals';
import count from '../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js';

describe('count source', () => {
  it('should emit max+1 values when given a max argument (0 through max inclusive)', (done) => {
    const source = count(5);
    const results: number[] = [];

    function read() {
      source(null, (end: any, value: any) => {
        if (end === true) {
          expect(results).toEqual([0, 1, 2, 3, 4, 5]);
          done();
          return;
        }
        if (end) {
          done(end);
          return;
        }
        results.push(value);
        read();
      });
    }

    read();
  });
});