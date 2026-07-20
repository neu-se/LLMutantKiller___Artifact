import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should call the function with the correct arguments', () => {
    const func = jest.fn();
    const promise = Q.resolve();
    promise.fcall(func, 1, 2, 3);
    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith(1, 2, 3);
  });
});