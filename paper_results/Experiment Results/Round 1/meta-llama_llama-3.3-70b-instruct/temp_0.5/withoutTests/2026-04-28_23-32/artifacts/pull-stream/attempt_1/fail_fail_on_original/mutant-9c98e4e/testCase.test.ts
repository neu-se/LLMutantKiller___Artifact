import { count } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count function', () => {
  it('should not call callback with true when i equals max', () => {
    let called = false;
    const cb = (err: any, value: any) => {
      if (err === true) {
        called = true;
      }
    };
    const counter = count(1);
    counter(null, cb);
    expect(called).toBe(false);
  });
});