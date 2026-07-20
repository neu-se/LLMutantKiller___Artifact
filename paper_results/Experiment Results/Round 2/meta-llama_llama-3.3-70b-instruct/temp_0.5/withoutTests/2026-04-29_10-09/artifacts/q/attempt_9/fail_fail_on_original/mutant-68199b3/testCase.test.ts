describe('Q', () => {
  it('should check method name in fcall', () => {
    const Q = require('../../../../../../../../subject_repositories/q/q.js');
    const promise = Q.resolve();
    const func = jest.fn();
    const originalFcall = promise.fcall;
    promise.fcall = function () {
      return this.dispatch("apply", [void 0, Array.prototype.slice.call(arguments, 1)]);
    };
    expect(() => promise.fcall(func, 1, 2, 3)).not.toThrowError();
    promise.fcall = originalFcall;
    const mutatedFcall = function () {
      return this.dispatch("", [void 0, Array.prototype.slice.call(arguments, 1)]);
    };
    promise.fcall = mutatedFcall;
    expect(() => promise.fcall(func, 1, 2, 3)).toThrowError();
  });
});