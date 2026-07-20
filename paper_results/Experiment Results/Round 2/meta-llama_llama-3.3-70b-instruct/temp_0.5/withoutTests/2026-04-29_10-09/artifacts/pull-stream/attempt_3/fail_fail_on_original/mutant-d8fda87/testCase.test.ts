import once from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js";

describe('once function', () => {
  it('should call callback with error when abort is true and value is null', () => {
    const cb = jest.fn();
    const abort = true;
    const value = null;
    once(value)(abort, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(true, undefined);
  });
});