import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter', () => {
  it('should handle async reads correctly and fail when sync is false', (done) => {
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
      if (count < 5) {
        filteredSource(null, callback);
      }
    };

    const sync = true;
    filteredSource(null, (end: any, data: any) => {
      if (end) {
        if (!sync) {
          done(new Error('Sync should be true'));
        } else {
          done();
        }
      } else {
        callback(end, data);
      }
    });
  }, 10000);
});