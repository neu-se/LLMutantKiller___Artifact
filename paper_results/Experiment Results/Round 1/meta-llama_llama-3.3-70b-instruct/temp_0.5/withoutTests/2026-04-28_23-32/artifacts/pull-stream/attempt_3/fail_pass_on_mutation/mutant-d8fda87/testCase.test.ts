import once from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js";

describe('once function', () => {
  it('should call cb with value when abort is false and value is not null', () => {
    const onAbort = jest.fn();
    const cb = jest.fn();
    const abort = false;
    const value = 'test';
    const onceFunc = once(value, onAbort);
    onceFunc(abort, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, value);
  });
});