import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should not throw an error when the first argument is a function with length 1', () => {
    const func = () => {};
    func.length = 1;
    expect(() => pull(func)).not.toThrow();
  });
})