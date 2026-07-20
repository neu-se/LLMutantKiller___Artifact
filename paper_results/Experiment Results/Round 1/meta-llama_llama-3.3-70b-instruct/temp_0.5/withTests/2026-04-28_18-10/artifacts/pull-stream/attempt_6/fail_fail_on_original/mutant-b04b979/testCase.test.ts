import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should pass through values when map function returns them', (done) => {
    const originalId = (e: any) => e;
    const mutatedId = (e: any) => {};
    const read = asyncMap((data: any, cb: any) => cb(null, data));
    let count = 0;
    read(null, (end: any, data: any) => {
      if (end) {
        expect(count).toBe(0);
        done();
      } else {
        expect(data).toBeUndefined();
        count++;
      }
    });
    expect(originalId(1)).toBe(1);
    expect(mutatedId(1)).toBeUndefined();
  });
});