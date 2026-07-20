import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle object with sink method as second argument', () => {
    const obj = {
      sink: (read: any) => {
        read(null, (end: any, data: any) => {
          expect(data).toBe('test');
        });
      }
    };

    const read = pull(
      (abort: any, cb: any) => {
        if (abort) return cb(abort);
        cb(null, 'test');
      },
      obj
    );

    expect(read).not.toBeUndefined();
  });
});