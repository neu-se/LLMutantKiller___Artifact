import { describe, it, expect } from '@jest/globals';
import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce', () => {
  it('should call callback with error when source errors', (done) => {
    const ERR = new Error('test error');
    const source = (abort: any, cb: Function) => {
      cb(ERR);
    };
    const sink = reduce((acc: number, data: number) => acc + data, 0, (err: any, val: any) => {
      expect(err).toBe(ERR);
      expect(val).toBe(0);
      done();
    });
    sink(source);
  });
});