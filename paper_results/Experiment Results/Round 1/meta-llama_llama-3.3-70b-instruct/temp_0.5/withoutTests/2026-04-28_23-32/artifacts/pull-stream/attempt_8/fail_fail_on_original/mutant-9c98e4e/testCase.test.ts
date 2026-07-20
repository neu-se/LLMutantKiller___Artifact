import * as countModule from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count function', () => {
  it('should call callback twice when max is 2', () => {
    let called = 0;
    let ended = false;
    const cb = (err: any, val: any) => {
      if (err === null) {
        called++;
      } else if (err === true) {
        ended = true;
      }
    };
    const counter = countModule.default(2);
    counter(null, cb);
    counter(null, cb);
    counter(null, cb);
    expect(called).toBe(2);
    expect(ended).toBe(true);
  });
});