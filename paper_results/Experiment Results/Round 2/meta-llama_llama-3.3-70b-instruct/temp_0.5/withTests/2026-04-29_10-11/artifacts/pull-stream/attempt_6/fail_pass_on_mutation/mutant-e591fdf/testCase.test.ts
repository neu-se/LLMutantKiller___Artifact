import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should behave differently when the first argument is a function', () => {
    const func = function(a) {};
    expect(() => pull(func)).not.toThrow();
    const notFunc = 'string';
    expect(() => pull(notFunc)).not.toThrow();
  });
})