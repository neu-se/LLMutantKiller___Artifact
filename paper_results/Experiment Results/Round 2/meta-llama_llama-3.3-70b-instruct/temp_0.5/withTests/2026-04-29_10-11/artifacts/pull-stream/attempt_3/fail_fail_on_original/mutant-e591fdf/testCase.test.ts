import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should call the function with the correct arguments when the first argument is a function', () => {
    const func = () => {};
    pull(func);
    expect(() => pull(func)).toThrow(TypeError);
  });
})