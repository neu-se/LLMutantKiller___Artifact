import * as countModule from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count function', () => {
  it('should call callback with next value 5 times when max is 5', () => {
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
          expect(countCalls).toBe(max);
        }
      }
    };
    countStream(null, callback);
  });
});