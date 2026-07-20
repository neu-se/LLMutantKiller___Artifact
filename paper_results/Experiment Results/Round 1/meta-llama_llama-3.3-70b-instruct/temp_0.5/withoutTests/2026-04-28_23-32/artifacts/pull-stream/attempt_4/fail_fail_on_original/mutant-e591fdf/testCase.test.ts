import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should not throw an error when the first argument is a non-function object', () => {
    const obj = {};
    expect(() => pull(obj)).not.toThrowError();
  });
});