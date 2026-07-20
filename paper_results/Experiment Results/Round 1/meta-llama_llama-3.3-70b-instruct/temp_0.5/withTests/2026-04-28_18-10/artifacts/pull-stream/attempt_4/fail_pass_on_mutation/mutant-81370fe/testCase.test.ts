import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle object as second argument', () => {
    const read = pull(
      (abort: any, cb: any) => {
        if (abort) return cb(abort);
        cb(null, 'test');
      },
      {
        sink: (read: any) => {
          read(null, (end: any, data: any) => {
            expect(data).toBe('test');
          });
        },
        source: () => {}
      }
    );

    expect(read).not.toBeUndefined();
  });
});