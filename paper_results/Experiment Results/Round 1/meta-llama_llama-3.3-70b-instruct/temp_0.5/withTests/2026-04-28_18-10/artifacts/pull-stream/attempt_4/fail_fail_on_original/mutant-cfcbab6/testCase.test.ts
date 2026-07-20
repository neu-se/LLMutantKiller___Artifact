import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should not iterate over arguments with length greater than the actual number of arguments', () => {
    const read = pull(
      (abort: any, cb: any) => {
        cb(null, 1);
      },
      (read: any) => {
        return (abort: any, cb: any) => {
          read(abort, (end: any, data: any) => {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      }
    );

    const read2 = pull(
      (abort: any, cb: any) => {
        cb(null, 1);
      },
      (read: any) => {
        return (abort: any, cb: any) => {
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

    expect(read(null, () => {})).not.toThrow();
    expect(read2(null, () => {})).toThrow();
  });
});