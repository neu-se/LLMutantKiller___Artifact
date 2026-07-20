import { asyncMap } from '../../../throughs/async-map.js';
import { values } from '../../../sources/values.js';

describe('asyncMap', () => {
  it('should pass through values when map function returns them', (done) => {
    const read = asyncMap((data: any, cb: any) => cb(null, data), values([1, 2, 3]));
    let count = 0;
    read(null, (end: any, data: any) => {
      if (end) {
        expect(count).toBe(3);
        done();
      } else {
        expect(data).toBe(count + 1);
        count++;
      }
    });
  });
});