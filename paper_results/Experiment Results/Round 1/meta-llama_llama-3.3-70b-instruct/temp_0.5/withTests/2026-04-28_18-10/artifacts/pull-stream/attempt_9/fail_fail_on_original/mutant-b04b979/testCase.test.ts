import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should pass through values when map function returns them', (done) => {
    const source = (end: any, cb: any) => {
      cb(null, 1);
    };
    const read = asyncMap((data: any, cb: any) => cb(null, data), source);
    read(null, (end: any, data: any) => {
      if (end) {
        done();
      } else {
        expect(data).toBe(1);
        done();
      }
    });
  });
});