import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should handle case 2 correctly', (done) => {
    const values = [1, 2];
    const read = pull(
      () => {
        let i = 0;
        return (abort: any, cb: any) => {
          if (abort) return cb(abort);
          if (i >= values.length) return cb(true);
          cb(null, values[i++]);
        };
      },
      (read: any) => {
        return (abort: any, cb: any) => {
          read(abort, (end: any, data: any) => {
            if (end) return cb(end);
            cb(null, data);
          });
        };
      },
      (read: any) => {
        return (abort: any, cb: any) => {
          read(abort, (end: any, data: any) => {
            if (end) return cb(end);
            cb(null, data);
          });
        };
      }
    );

    let data: any[] = [];

    read(null, (end: any, d: any) => {
      if (end) {
        expect(data).toEqual([1, 2]);
        done();
      } else {
        data.push(d);
      }
    });
  });
});