import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find', () => {
  it('should call callback with null error when test returns true', () => {
    const test = (data: any) => data === 7;
    const cb = jest.fn();
    find(test, cb);
    cb(null, 7);
    expect(cb).toHaveBeenCalledTimes(2);
    expect(cb).toHaveBeenNthCalledWith(1, null, 7);
  });

  it('should call callback with error when test never returns true', () => {
    const test = (data: any) => data === 7;
    const cb = jest.fn();
    find(test, cb);
    cb(new Error('test error'), null);
    expect(cb).toHaveBeenCalledTimes(2);
    expect(cb).toHaveBeenNthCalledWith(1, new Error('test error'), null);
  });
});