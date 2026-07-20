import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should call callback with error when source ends immediately with error', () => {
    let callbackCalled = false;
    const error = new Error('Test error');
    const reducer = (acc: any, data: any) => acc;
    const cb = (err: any, acc: any) => {
      callbackCalled = true;
      expect(err).toBe(error);
    };
    const source = (err: any, cb: any) => cb(true, error);
    reduce(reducer, cb)(source);
    expect(callbackCalled).toBe(true);
  });
});