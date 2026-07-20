import * as onceModule from '../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js';

describe('once', () => {
  it('should call cb with value when value is not null and abort is false, and not call cb when value is not null and abort is true', () => {
    const value = 'test';
    const onAbort = jest.fn();
    const cbWithValue = jest.fn();
    const onceFnWithValue = onceModule.default;
    onceFnWithValue(value, onAbort)(false, cbWithValue);
    onceFnWithValue(value, onAbort)(true, cbWithValue);
    expect(cbWithValue).toHaveBeenCalledTimes(1);
    expect(onAbort).toHaveBeenCalledTimes(1);
  });
});