import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when the first argument is a non-function value with length property in the mutated code', () => {
    const obj = { length: 1 };
    expect(() => pull(obj)).toThrowError();
  });
});