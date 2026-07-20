import once from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js";

describe('once function', () => {
  it('should call callback with value when abort is true and value is not null', () => {
    const cb = jest.fn();
    const abort = true;
    const value = 'test value';
    once(value)(abort, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 'test value');
  });
});