import * as countModule from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count function', () => {
  it('should call callback with next value 6 times when max is 5 and then end in mutated code', () => {
    const max = 5;
    const countStream = countModule.default(max);
    let countCalls = 0;
    const callback = (end: boolean, data: number) => {
      if (end) {
        expect(countCalls).toBe(max);
      } else {
        countCalls++;
        if (countCalls < max + 1) {
          countStream(null, callback);
        }
      }
    };
    countStream(null, callback);
  });
});