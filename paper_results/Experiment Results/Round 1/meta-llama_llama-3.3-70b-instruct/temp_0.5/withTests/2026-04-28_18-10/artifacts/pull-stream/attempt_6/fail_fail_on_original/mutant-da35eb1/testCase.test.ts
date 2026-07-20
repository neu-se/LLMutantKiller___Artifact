import * as findModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find', () => {
  it('should call callback with null error when test returns true and error is null', () => {
    const test = (data: any) => data === 7;
    const cb = jest.fn();
    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      cb(null, 7);
    };
    const find = findModule.default || findModule;
    const read = find(test, cb);
    read(source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenNthCalledWith(1, null, 7);

    const source2 = (end: any, cb: any) => {
      if (end) return cb(end);
      cb(new Error('test error'), null);
    };
    const read2 = find(test, cb);
    read2(source2);
    expect(cb).toHaveBeenCalledTimes(2);
    expect(cb).toHaveBeenNthCalledWith(2, null, null);
  });
});