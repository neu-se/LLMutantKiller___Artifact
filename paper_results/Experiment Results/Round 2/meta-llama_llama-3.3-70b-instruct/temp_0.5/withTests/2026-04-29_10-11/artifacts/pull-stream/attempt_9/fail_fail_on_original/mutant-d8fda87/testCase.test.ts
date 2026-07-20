import { once } from '../../../../../../../../subject_repositories/pull-stream/sources/once.js';

describe('once', () => {
  it('should call callback with value when value is not null and abort is false, but should not call callback when abort is true and value is not null in the mutated code', () => {
    const cb = jest.fn();
    const onAbort = jest.fn();
    const read = once('test', onAbort);
    read(false, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 'test');
    read(true, cb);
    expect(onAbort).toHaveBeenCalledTimes(1);
    // This test case should pass on the original code and fail on the mutated code because
    // in the mutated code, the condition if(abort) is changed to if(false), so the onAbort
    // callback will not be called when abort is true.
  });
});