import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should handle function arguments correctly', () => {
    const s1 = (read: any) => read;
    const s2 = (read: any) => { throw new Error('Test error') };
    const result = pull(s1, s2);
    expect(result).toBeInstanceOf(Function);
    const read = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(null, 'test');
    };
    result(read, (err: any, data: any) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Test error');
    });
  });
});