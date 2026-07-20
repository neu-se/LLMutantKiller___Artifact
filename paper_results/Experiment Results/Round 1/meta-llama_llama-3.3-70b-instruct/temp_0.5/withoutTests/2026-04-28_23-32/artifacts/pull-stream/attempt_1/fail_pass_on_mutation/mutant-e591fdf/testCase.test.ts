import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when the first argument is not a function', () => {
    expect(() => pull('string')).toThrowError(TypeError);
  });
});