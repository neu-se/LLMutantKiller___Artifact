import * as countModule from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count function', () => {
  it('should call callback with i equal to max and then end when max is reached', () => {
    let called = 0;
    let ended = false;
    const cb = (err: any, val: any) => {
      if (err === null) {
        called++;
      } else if (err === true) {
        ended = true;
      }
    };
    const counter = countModule.default(1);
    counter(null, cb);
    counter(null, cb);
    expect(called).toBe(1);
    expect(ended).toBe(true);
  });
});