import asyncMap from '../../../throughs/async-map.js';

describe('asyncMap', () => {
  it('should pass through values when map function returns them', (done) => {
    const read = asyncMap(function (data, cb) {
      cb(null, data);
    });
    let count = 0;
    read(null, function (end, data) {
      if (end) {
        expect(count).toBe(0);
        done();
      } else {
        expect(data).toBeUndefined();
        count++;
      }
    });
    read(null, function (end, data) {
      if (end) {
        expect(count).toBe(1);
        done();
      } else {
        expect(data).toBeUndefined();
        count++;
      }
    });
  });
});