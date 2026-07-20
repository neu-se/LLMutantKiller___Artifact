import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should throw an error when the first argument is a function with length 0 and a second argument is provided', () => {
    const func = function() {};
    expect(() => pull(func, 'arg')).toThrow();
  });
})