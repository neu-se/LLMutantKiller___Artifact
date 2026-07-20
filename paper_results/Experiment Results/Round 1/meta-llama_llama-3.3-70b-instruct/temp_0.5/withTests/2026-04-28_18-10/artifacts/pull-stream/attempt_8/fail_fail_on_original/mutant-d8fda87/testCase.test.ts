import * as onceModule from '../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js';

describe('once', () => {
  it('should call cb with value when value is not null and abort is false, but not call cb when value is null and abort is false', () => {
    const value = 'test';
    const nullValue = null;
    const onAbort = jest.fn();
    const cbWithValue = jest.fn();
    const cbWithNullValue = jest.fn();
    const onceFnWithValue = onceModule.default;
    const onceFnWithNullValue = onceModule.default;
    onceFnWithValue(value, onAbort)(false, cbWithValue);
    onceFnWithNullValue(nullValue, onAbort)(false, cbWithNullValue);
    expect(cbWithValue).toHaveBeenCalledTimes(1);
    expect(cbWithValue).toHaveBeenCalledWith(null, value);
    expect(cbWithNullValue).toHaveBeenCalledTimes(1);
    expect(cbWithNullValue).toHaveBeenCalledWith(true, undefined);
    expect(onAbort).toHaveBeenCalledTimes(0);
  });
});