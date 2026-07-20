import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when the first argument is a non-function object in the mutated code', () => {
    const func = () => {};
    pull(func);
    expect(() => pull('string')).not.toThrowError();
  });
});