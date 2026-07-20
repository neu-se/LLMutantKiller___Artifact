import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should behave differently when the first argument is a function and when it is a non-function value', () => {
    const func = () => {};
    const result1 = pull(func);
    const obj = {};
    const result2 = pull(obj);
    expect(typeof result1).not.toBe(typeof result2);
  });
});