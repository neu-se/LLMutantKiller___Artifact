import { infinite } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js";

describe('infinite function', () => {
  it('should not call callback with end value when end is truthy in the mutated version', () => {
    const cb = jest.fn();
    const end = true;
    const generate = () => {};
    const infiniteFunc = infinite(generate);
    infiniteFunc(end, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, expect.any(Number));
  });
});