import * as countModule from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count function', () => {
  it('should call callback with next value when i is less than max', (done) => {
    const max = 5;
    const countStream = countModule.default(max);
    let countCalls = 0;
    countStream(null, (end: boolean, data: number) => {
      if (end) {
        done(new Error('Callback called with end before max'));
      } else {
        countCalls++;
        if (countCalls === max) {
          countStream(null, (end: boolean, data: number) => {
            if (end) {
              done();
            } else {
              done(new Error('Callback not called with end when i equals max'));
            }
          });
        } else {
          countStream(null, () => {});
        }
      }
    });
  });
});