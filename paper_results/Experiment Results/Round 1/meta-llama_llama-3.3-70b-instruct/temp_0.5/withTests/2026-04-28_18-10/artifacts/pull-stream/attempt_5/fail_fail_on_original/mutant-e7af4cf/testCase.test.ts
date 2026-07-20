import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter', () => {
  it('should handle async reads correctly', (done) => {
    const testFunction = (data: any) => data > 5;
    const source = (end: any, cb: any) => {
      let i = 0;
      return function next(end: any, cb: any) {
        if (end === true) return cb(null);
        if (end) return cb(end);
        setTimeout(() => {
          cb(null, i++);
        }, 10);
      };
    };

    const filteredSource = filter(testFunction)(source);

    let count = 0;
    const callback = (end: any, data: any) => {
      if (end) {
        expect(count).toBe(5);
        done();
        return;
      }
      expect(data).toBeGreaterThan(5);
      count++;
      if (count === 5) {
        filteredSource(true, (end: any, data: any) => {
          expect(end).toBe(true);
        });
      } else {
        filteredSource(null, callback);
      }
    };

    filteredSource(null, callback);
  });
});