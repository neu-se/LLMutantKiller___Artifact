import * as reduceModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should call callback with null when source ends immediately without error', () => {
    let callbackCalled = false;
    const reducer = (acc: any, data: any) => acc;
    const cb = (err: any, acc: any) => {
      callbackCalled = true;
      expect(err).toBeNull();
    };
    const source = (err: any, cb: any) => cb(true);
    const reduce = reduceModule;
    reduce(reducer, cb)(source);
    expect(callbackCalled).toBe(true);
  });
});