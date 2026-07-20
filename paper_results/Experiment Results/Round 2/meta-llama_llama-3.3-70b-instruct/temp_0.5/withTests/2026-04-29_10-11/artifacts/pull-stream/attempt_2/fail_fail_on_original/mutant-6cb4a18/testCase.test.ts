import { infinite } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js";

describe('infinite', () => {
  it('should call cb with value when end is false', () => {
    const cb = jest.fn();
    const read = infinite(() => Math.random());
    read(false, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, expect.any(Number));
  });
});