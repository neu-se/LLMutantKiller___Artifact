import { filter } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter', () => {
  it('should handle sync and async reads correctly', () => {
    const testFunction = (data: any) => data > 5;
    const source = (end: any, cb: any) => {
      let i = 0;
      return function next(end: any, cb: any) {
        if (end === true) return cb(null);
        if (end) return cb(end);
        cb(null, i++);
      };
    };

    const filteredSource = filter(testFunction)(source);

    let count = 0;
    filteredSource(null, (end: any, data: any) => {
      if (end) return;
      expect(data).toBeGreaterThan(5);
      count++;
      if (count === 5) {
        filteredSource(true, (end: any, data: any) => {
          expect(end).toBe(true);
        });
      }
    });
  });
});