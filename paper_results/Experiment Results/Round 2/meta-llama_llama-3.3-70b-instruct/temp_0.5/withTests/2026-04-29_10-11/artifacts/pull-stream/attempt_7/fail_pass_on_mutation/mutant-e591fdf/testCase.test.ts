import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should check the type of the first argument', () => {
    const func = function(a) {};
    expect(typeof pull(func)).toBe('function');
    const notFunc = 'string';
    expect(() => pull(notFunc)).not.toThrow();
  });
})