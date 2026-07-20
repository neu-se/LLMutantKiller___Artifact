import { once } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js";

describe('once function', () => {
  it('should call abortCb when abort is true', () => {
    const onAbort = jest.fn();
    const cb = jest.fn();
    const abort = true;
    const value = null;
    once(value, onAbort)(abort, cb);
    expect(onAbort).toHaveBeenCalledTimes(1);
  });
});