import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when the first argument is not a function and the second argument is a function with length 1', () => {
    const func = () => {};
    expect(() => pull('string', func)).toThrowError();
  });
});