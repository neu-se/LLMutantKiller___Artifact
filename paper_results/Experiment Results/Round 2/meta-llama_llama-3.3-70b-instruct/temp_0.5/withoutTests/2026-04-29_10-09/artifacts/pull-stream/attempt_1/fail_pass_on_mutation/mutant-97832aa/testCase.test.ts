import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when sink is not a function and not an object', () => {
    expect(() => pull(() => {}, null)).toThrowError();
  });
});