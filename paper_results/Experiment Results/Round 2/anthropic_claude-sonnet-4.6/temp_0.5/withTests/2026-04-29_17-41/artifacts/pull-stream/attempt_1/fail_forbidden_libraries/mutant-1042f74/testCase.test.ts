import { describe, it, expect } from '@jest/globals';
import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should process all items from a synchronous source and call done with null', (done) => {
    const values = [1, 2, 3, 4, 5];
    let i = 0;
    const collected: number[] = [];

    // Synchronous source
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    const sink = drain((data: number) => {
      collected.push(data);
    }, (err: any) => {
      expect(err).toBeNull();
      expect(collected).toEqual([1, 2, 3, 4, 5]);
      done();
    });

    sink(source);
  });
});