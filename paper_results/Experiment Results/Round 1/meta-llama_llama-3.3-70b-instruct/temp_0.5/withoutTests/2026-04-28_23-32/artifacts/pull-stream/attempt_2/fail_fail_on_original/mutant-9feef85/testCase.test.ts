import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should call the callback with true when array is null or undefined in the original code', () => {
    const onAbort = jest.fn();
    const cb = jest.fn();
    const abort = false;
    const result = values(null, onAbort);
    result(abort, cb);
    expect(onAbort).toHaveBeenCalledTimes(0);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(true);
  });
});