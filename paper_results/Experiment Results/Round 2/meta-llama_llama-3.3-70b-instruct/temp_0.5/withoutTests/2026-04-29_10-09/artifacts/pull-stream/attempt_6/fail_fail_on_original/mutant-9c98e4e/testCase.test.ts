import * as countModule from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count function', () => {
  it('should call callback with next value when i is less than max and not call with end when i equals max', () => {
    const max = 5;
    const countStream = countModule.default(max);
    let countCalls = 0;
    const callback = (end: boolean, data: number) => {
      if (end) {
        expect(false).toBe(true); // should not reach here
      } else {
        countCalls++;
        if (countCalls < max) {
          countStream(null, callback);
        } else {
          countStream(null, callback);
        }
      }
    };
    countStream(null, callback);
  });
});