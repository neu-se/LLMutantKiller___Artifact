import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should handle multiple arguments correctly', () => {
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
        return (abort: any, cb: any) => {
          count++;
          read(abort, (end: any, data: any) => {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      },
      (read: any) => {
        throw new Error('Should not be called');
      }
    );

    expect(() => read(null, () => {})).toThrow();
  });
});