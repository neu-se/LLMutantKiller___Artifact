import * as countModule from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count function', () => {
  it('should call callback twice when max is 2', () => {
    let called = 0;
    let values: number[] = [];
    const cb = (err: any, val: any) => {
      if (err === null) {
        called++;
        values.push(val);
      }
    };
    const counter = countModule.default(2);
    counter(null, cb);
    counter(null, cb);
    expect(called).toBe(2);
    expect(values).toEqual([0, 1]);
  });
});