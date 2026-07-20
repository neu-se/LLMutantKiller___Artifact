import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should not abort when no abort signal is given', () => {
    const array = [1, 2, 3];
    const onAbort = jest.fn();
    const cb = jest.fn();
    const stream = values(array, onAbort);
    expect(() => stream(null, cb)).not.toThrow();
    expect(onAbort).not.toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenNthCalledWith(1, null, 1);
  });
});