import * as countModule from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count function', () => {
  it('should call callback with next value when i is less than max', (done) => {
    const max = 5;
    const countStream = countModule.default(max);
    let countCalls = 0;
    countStream(null, (end: boolean, data: number) => {
      if (end) {
        if (countCalls !== max) {
          done(new Error('Callback not called with next value when i is less than max'));
        } else {
          done();
        }
      } else {
        countCalls++;
        if (countCalls === max) {
          countStream(true, () => {});
        } else {
          countStream(null, () => {});
        }
      }
    });
  });
});