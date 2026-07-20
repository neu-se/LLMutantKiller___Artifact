import infinite from "../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js";

describe('infinite', () => {
  it.skip('should call cb with end when end is true', () => {
    const cb = jest.fn();
    const read = infinite(() => Math.random());
    read(true, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(true, undefined);
  });

  it('should not call cb with end when end is false and cb is provided in the mutated version', () => {
    const cb = jest.fn();
    const read = infinite(() => Math.random());
    read(false, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, expect.any(Number));
  });
});