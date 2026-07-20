import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should handle function arguments correctly', () => {
    const s1 = (read: any) => read;
    const s2 = (read: any) => { return { source: (read: any) => read } };
    const result = pull(s1, s2);
    expect(result).toBeInstanceOf(Function);
    expect(() => result(null, () => {})).not.toThrowError();
  });
});