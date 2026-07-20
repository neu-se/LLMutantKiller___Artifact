import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should behave differently when the first argument is a function and when it is not', () => {
    const func = () => {};
    expect(pull(func)).toBeInstanceOf(Function);
    expect(() => pull('string')).toThrowError();
  });
});