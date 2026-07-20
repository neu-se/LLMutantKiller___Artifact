import * as countModule from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count function', () => {
  it('should call callback with i equal to 1 when max is 2', () => {
    let called = false;
    let value: any;
    const cb = (err: any, val: any) => {
      if (err === null) {
        called = true;
        value = val;
      }
    };
    const counter = countModule.default(2);
    counter(null, cb);
    counter(null, cb);
    expect(called).toBe(true);
    expect(value).toBe(1);
  });
});