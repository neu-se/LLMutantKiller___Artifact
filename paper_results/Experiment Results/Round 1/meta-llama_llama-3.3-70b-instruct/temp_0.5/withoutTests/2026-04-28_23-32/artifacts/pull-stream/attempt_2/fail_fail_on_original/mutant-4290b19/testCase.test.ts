import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should not throw an error when called with a function and one argument', () => {
    const func = () => {};
    const result = pull(func, func);
    expect(result).toBeInstanceOf(Function);
  });
});