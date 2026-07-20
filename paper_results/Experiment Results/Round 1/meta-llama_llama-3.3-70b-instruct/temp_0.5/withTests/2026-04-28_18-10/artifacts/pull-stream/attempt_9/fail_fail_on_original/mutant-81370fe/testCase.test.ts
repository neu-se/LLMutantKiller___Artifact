import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle object with source method as second argument', () => {
    const obj = {
      source: () => (abort: any, cb: any) => {
        if (abort) return cb(abort);
        cb(null, 'test');
      }
    };

    const read = pull(obj);

    let ended = false;
    read(null, (end: any, data: any) => {
      if (end) ended = true;
      expect(data).toBe('test');
    });

    expect(ended).toBe(true);
  });
});