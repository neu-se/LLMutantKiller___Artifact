import * as findModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find', () => {
  it('should call callback with null error when test returns true and error is not null', () => {
    const test = (data: any) => data === 7;
    const cb = jest.fn();
    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      cb(new Error('test error'), 7);
    };
    const find = findModule.default || findModule;
    const read = find(test, cb);
    read(source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenNthCalledWith(1, null, 7);
  });
});