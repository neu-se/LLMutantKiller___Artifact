import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should throw an error when callback is null in finally', () => {
    expect(() => Q().finally(null)).toThrowError('Q can\'t apply finally callback');
  });
});