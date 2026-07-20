import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle function as second argument', () => {
    const read = pull(
      (abort: any, cb: any) => {
        if (abort) return cb(abort);
        cb(null, 'test');
      },
      (data: any) => data,
      {
        sink: (read: any) => {
          read(null, (end: any, data: any) => {
            expect(data).toBe('test');
          });
        },
        source: () => {}
      }
    );

    let ended = false;
    read(null, (end: any, data: any) => {
      if (end) ended = true;
      expect(data).toBe('test');
    });

    expect(ended).toBe(true);
  });
});