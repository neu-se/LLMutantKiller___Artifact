import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('does not throw an error when callback is not a function in finally', () => {
    const callback = null;
    expect(() => Q().finally(callback)).toThrowError('Q can\'t apply finally callback');
  });

  it('throws an error when callback is not a function in finally', () => {
    const callback = 'string';
    expect(() => Q().finally(callback)).toThrowError('Q can\'t apply finally callback');
  });
});