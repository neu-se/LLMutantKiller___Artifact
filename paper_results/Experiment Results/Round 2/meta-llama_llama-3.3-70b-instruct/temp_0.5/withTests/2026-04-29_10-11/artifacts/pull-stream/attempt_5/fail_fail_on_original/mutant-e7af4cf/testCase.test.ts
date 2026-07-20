import { filter } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter', () => {
  it('should pass when sync is true and fail when sync is false', () => {
    const testFunction = (data: any) => data !== null;
    let count = 0;
    const read = filter(testFunction)(function (end: boolean, cb: (end: boolean, data: any) => void) {
      if (end) return cb(end, null);
      count++;
      if (count < 3) {
        cb(null, count);
      } else {
        cb(true, null);
      }
    });
    read(null, function (end: boolean, data: any) {
      if (end) return;
      read(null, function (end: boolean, data: any) {
        if (end) return;
        read(null, function (end: boolean, data: any) {
          if (end) return;
          expect(end).toBe(true);
        });
      });
    });
  });
});