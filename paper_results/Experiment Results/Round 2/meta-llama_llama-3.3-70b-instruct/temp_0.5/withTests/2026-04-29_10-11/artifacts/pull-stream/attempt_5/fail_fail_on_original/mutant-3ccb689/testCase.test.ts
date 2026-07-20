import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';
import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('async-map', () => {
  it('should abort when map function throws an error', (done) => {
    const source = values([1, 2, 3]);
    const asyncMapStream = asyncMap((data: any, cb: (err: Error | null, data: any) => void) => {
      if (data === 2) {
        cb(new Error('Test error'), null);
      } else {
        cb(null, data);
      }
    });
    const read = asyncMapStream(source);
    read(true, (end: any, data: any) => {
      expect(end).toBe(true);
      done();
    });
  });
});