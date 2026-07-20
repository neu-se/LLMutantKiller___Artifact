import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should handle more than 4 arguments', () => {
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
        return (abort: any, cb: any) => {
          read(abort, (end: any, data: any) => {
            if (end) cb(end);
            else cb(null, data);
          });
        };
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

    read(null, (end: any, data: any) => {
      expect(end).toBe(null);
      expect(data).toBe(1);
    });
  });
});