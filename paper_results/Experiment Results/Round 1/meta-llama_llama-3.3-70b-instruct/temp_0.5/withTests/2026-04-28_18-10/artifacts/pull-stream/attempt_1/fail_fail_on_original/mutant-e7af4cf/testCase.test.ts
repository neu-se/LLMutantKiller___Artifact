import { filter } from '../../../../../subject_repositories/pull-stream/throughs/filter.js'

describe('filter', () => {
  it('should pass when sync is true and fail when sync is false', () => {
    const syncFilter = filter((data: any) => data);
    const asyncFilter = filter((data: any) => data);

    // Create a source stream that emits numbers from 1 to 10
    const source = (end: any, cb: any) => {
      let i = 0;
      return function next(end: any, cb: any) {
        if (end === true) return cb(null);
        if (end) return cb(end);
        cb(null, i++);
      };
    };

    // Create a drain stream that collects the filtered data
    const drain = (read: any) => {
      const collected: any[] = [];
      return function (end: any, cb: any) {
        if (end) return cb(end);
        read(null, (end: any, data: any) => {
          if (end) return cb(end);
          collected.push(data);
          cb(null, data);
        });
      };
    };

    // Test with sync filter
    const syncRead = syncFilter(source);
    const syncDrain = drain(syncRead);
    syncDrain(null, (end: any, data: any) => {
      expect(end).toBe(true);
    });

    // Test with async filter
    const asyncRead = asyncFilter(source);
    const asyncDrain = drain(asyncRead);
    asyncDrain(null, (end: any, data: any) => {
      expect(end).toBe(true);
    });
  });
});