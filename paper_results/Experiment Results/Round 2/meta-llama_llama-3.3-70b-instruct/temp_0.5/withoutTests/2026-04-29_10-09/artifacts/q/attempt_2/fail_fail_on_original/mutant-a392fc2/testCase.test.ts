import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should not throw an error when callback is a function in finally', () => {
    expect(() => Q().finally(function() {})).not.toThrowError();
  });
});