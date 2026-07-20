import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should throw an error when calling dispatch with an empty string', () => {
    const promise = Q.resolve();
    expect(() => promise.dispatch("", [])).toThrowError();
  });
});