import { infinite } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js";

describe('infinite', () => {
  it('should call cb with end when end is true and cb is provided', () => {
    const cb = jest.fn();
    const read = infinite(() => Math.random());
    read(true, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(true, undefined);
  });

  it('should not call cb when end is true and cb is not provided in the mutated version', () => {
    const cb = jest.fn();
    const read = infinite(() => Math.random());
    read(true);
    expect(cb).not.toHaveBeenCalled();
  });
});