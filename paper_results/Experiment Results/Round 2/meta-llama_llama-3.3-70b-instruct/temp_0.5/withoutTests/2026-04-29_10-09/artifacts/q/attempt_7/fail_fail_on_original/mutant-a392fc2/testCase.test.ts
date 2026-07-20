import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should not throw an error when callback is a function in finally', () => {
    const callback = function() {};
    expect(() => Q().finally(callback)).not.toThrowError();
  });

  it('should call the callback when it is a function in finally', () => {
    const callback = jest.fn();
    Q().finally(callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});