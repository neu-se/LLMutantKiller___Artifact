import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should not throw an error when calling fcall on the original code', () => {
    const promise = Q.resolve();
    const func = jest.fn();
    expect(() => promise.fcall(func, 1, 2, 3)).not.toThrowError();
  });

  it('should throw an error when calling fcall on the mutated code', () => {
    const promise = Q.resolve();
    const func = jest.fn();
    // Simulate the mutation by modifying the fcall method
    const originalFcall = promise.fcall;
    promise.fcall = function () {
      return this.dispatch("", [void 0, Array.prototype.slice.call(arguments, 1)]);
    };
    expect(() => promise.fcall(func, 1, 2, 3)).toThrowError();
    // Restore the original fcall method
    promise.fcall = originalFcall;
  });
});