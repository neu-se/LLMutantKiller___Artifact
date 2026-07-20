import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle four arguments correctly', () => {
    const read = pull(
      (abort: any, cb: any) => {
        if (abort) return cb(abort);
        cb(null, 1);
      },
      (read: any) => {
        return (abort: any, cb: any) => {
          read(abort, (end: any, data: any) => {
            if (end) return cb(end);
            cb(null, data + 1);
          });
        };
      },
      (read: any) => {
        return (abort: any, cb: any) => {
          read(abort, (end: any, data: any) => {
            if (end) return cb(end);
            cb(null, data + 2);
          });
        };
      },
      (read: any) => {
        return (abort: any, cb: any) => {
          read(abort, (end: any, data: any) => {
            if (end) return cb(end);
            cb(null, data + 3);
          });
        };
      }
    );

    let called = 0;
    read(null, (end: any, data: any) => {
      if (end) throw new Error('Unexpected end');
      if (data !== 7) throw new Error('Expected data to be 7, but got ' + data);
      called++;
      if (called > 1) throw new Error('Expected read to be called only once');
    });
  });
});