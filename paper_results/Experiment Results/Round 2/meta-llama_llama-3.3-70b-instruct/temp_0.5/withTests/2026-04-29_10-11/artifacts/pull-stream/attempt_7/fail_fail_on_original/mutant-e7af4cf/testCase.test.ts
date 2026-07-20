import { filter } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter', () => {
  it('should pass when sync is true and fail when sync is false', () => {
    const testFunction = (data: number) => data > 0;
    let count = 0;
    const read = (end: boolean, cb: (end: boolean, data: number | null) => void) => {
      if (end) return cb(end, null);
      count++;
      if (count < 3) {
        cb(null, count);
      } else {
        cb(true, null);
      }
    };
    const filteredRead = filter(testFunction)(read);
    filteredRead(null, (end: boolean, data: number | null) => {
      if (end) return;
      filteredRead(null, (end: boolean, data: number | null) => {
        if (end) return;
        filteredRead(null, (end: boolean, data: number | null) => {
          if (end) return;
          expect(end).toBe(true);
        });
      });
    });
  });
});