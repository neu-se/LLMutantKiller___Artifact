import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should check the length of the first argument', () => {
    const func = function(a) {};
    const result1 = pull(func);
    const func2 = function() {};
    const result2 = pull(func2);
    expect(result1).not.toBe(result2);
  });
})