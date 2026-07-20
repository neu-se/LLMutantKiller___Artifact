import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should behave differently when the first argument is a function with length 1 and a second argument is provided', () => {
    const func = function(a) {};
    const result1 = pull(func, 'arg');
    const func2 = function() {};
    const result2 = pull(func2, 'arg');
    expect(result1).not.toBe(result2);
  });
})