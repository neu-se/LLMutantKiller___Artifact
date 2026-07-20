import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should handle function arguments correctly', () => {
    const s1 = (read: any) => read;
    const s2 = 'string';
    expect(() => pull(s1, s2)).toThrowError();
  });
});