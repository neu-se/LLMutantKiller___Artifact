import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should handle multiple arguments correctly', () => {
    let count = 0;
    const read = pull(
      (abort: any, cb: any) => {
        count++;
        cb(null, 1);
      },
      (abort: any, cb: any) => {
        count++;
        cb(null, 2);
      },
      (abort: any, cb: any) => {
        count++;
        cb(null, 3);
      }
    );

    read(null, () => {});
    expect(count).toBe(3);
  });
});