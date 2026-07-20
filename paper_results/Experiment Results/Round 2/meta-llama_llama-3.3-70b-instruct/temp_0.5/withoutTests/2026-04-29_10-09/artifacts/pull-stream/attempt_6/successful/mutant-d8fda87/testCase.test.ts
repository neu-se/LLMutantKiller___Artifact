import once from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js";

describe('once function', () => {
  it('should call callback with error when abort is true and value is not null, but only in the original code', () => {
    const cb = jest.fn();
    const abort = true;
    const value = 'test value';
    const onAbort = jest.fn();
    once(value, onAbort)(abort, cb);
    expect(onAbort).toHaveBeenCalledTimes(1);
  });
});