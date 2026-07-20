import { infinite } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js";
import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/drain.js";

describe('infinite', () => {
  it('should call cb with end when end is true', () => {
    const cb = jest.fn();
    const read = infinite(() => Math.random());
    read(true, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(true, undefined);
  });
});