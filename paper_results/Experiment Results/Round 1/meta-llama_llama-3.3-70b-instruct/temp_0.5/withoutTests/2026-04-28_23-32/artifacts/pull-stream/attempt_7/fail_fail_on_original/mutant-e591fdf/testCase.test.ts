import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should behave differently when the first argument is a function with length 1 and when it is not', () => {
    const func = () => {};
    func.length = 1;
    const result1 = pull(func);
    const func2 = () => {};
    func2.length = 0;
    const result2 = pull(func2);
    expect(typeof result1).not.toBe(typeof result2);
  });
});