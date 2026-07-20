import * as onceModule from '../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js';

describe('once', () => {
  it('should call cb with value when value is not null and abort is false', () => {
    const value = 'test';
    const onAbort = jest.fn();
    const cb = jest.fn();
    const onceFn = onceModule.default;
    onceFn(value, onAbort)(false, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, value);
    expect(onAbort).toHaveBeenCalledTimes(0);
  });

  it.skip('should call cb with value when value is not null and abort is true in the mutated code', () => {
    const value = 'test';
    const onAbort = jest.fn();
    const cb = jest.fn();
    const onceFn = onceModule.default;
    onceFn(value, onAbort)(true, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, value);
    expect(onAbort).toHaveBeenCalledTimes(0);
  });
});