import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter', () => {
  it('should handle async reads correctly and fail when sync is false', () => {
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
        return;
      }
      expect(data).toBeGreaterThan(5);
      count++;
      if (count < 5) {
        filteredSource(null, callback);
      }
    };

    filteredSource(null, callback);
    expect(() => {
      const sync = false;
      // This line should cause an error when sync is false
      filteredSource(null, (end: any, data: any) => {
        if (end && !sync) {
          throw new Error('Sync should be true');
        }
      });
    }).toThrowError('Sync should be true');
  }, 20000);
});