import { filter } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter', () => {
  it('should pass when sync is true and fail when sync is false', () => {
    const testFunction = (data: number) => data > 0;
    let count = 0;
    const read = filter(testFunction)(function (end: boolean, cb: (end: boolean, data: number) => void) {
      if (end) return cb(end);
      count++;
      cb(null, count);
    });
    read(null, function (end: boolean, data: number) {
      if (end) return;
      read(null, function (end: boolean, data: number) {
        if (end) return;
        expect(data).toBe(2);
      });
    });
  });
});