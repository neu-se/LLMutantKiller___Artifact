import { count } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count function', () => {
  it('should not call callback with true when i equals max', (done) => {
    const max = 5;
    const countStream = count(max);
    let countCalls = 0;
    let endCalls = 0;
    countStream(null, (end, data) => {
      if (end) {
        endCalls++;
        if (endCalls > 1) {
          done(new Error('Callback called with true when i equals max'));
        }
      } else {
        countCalls++;
        if (countCalls === max) {
          countStream(null, (end, data) => {
            if (end) {
              endCalls++;
              if (end) {
                done();
              } else {
                done(new Error('Callback not called with true when i exceeds max'));
              }
            } else {
              done(new Error('Callback not called with end when i equals max'));
            }
          });
        } else {
          countStream(null, (end, data) => {
            // continue
          });
        }
      }
    });
  });
});