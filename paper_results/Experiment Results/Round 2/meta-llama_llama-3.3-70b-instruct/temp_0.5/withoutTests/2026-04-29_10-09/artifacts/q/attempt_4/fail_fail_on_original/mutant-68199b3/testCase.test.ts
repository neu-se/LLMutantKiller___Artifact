import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should throw an error when calling dispatch with an empty string on fcall', () => {
    const promise = Q.resolve();
    const func = jest.fn();
    expect(() => promise.fcall(func, 1, 2, 3)).not.toThrowError();
    promise.fcall = function () {
      return this.dispatch("", [void 0, Array.prototype.slice.call(arguments, 1)]);
    };
    expect(() => promise.fcall(func, 1, 2, 3)).toThrowError();
  });
});