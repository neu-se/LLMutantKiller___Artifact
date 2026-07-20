import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should not throw an error when calling fcall', () => {
    const promise = Q.resolve();
    const func = jest.fn();
    expect(() => promise.fcall(func, 1, 2, 3)).not.toThrowError();
  });
});