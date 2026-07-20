import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should not iterate over more arguments than expected', () => {
    let count = 0;
    const read = pull(
      (abort: any, cb: any) => {
        count++;
        cb(null, 1);
      },
      (read: any) => {
        return (abort: any, cb: any) => {
          count++;
          read(abort, (end: any, data: any) => {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      },
      (read: any) => {
        count++;
        read(null, (end: any, data: any) => {
          if (end) return;
          else return;
        });
      }
    );

    read(null, () => {});
    expect(count).toBe(2);
  });
});