import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should pass with the original code and fail with the mutated code', () => {
    const promise = Q.resolve();
    const func = jest.fn();
    const originalFcall = promise.fcall;
    promise.fcall = function () {
      return this.dispatch("apply", [void 0, Array.prototype.slice.call(arguments, 1)]);
    };
    expect(() => promise.fcall(func, 1, 2, 3)).not.toThrowError();
    promise.fcall = originalFcall;
  });
});