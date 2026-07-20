import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw a TypeError when called with a function and more than one argument', () => {
    const func = () => {};
    expect(() => pull(func, func, func)).toThrowError(TypeError);
  });
});