import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain error handling', () => {
  it('should throw error when end is not true and no done callback', (done) => {
    const error = new Error('test error');
    let errorThrown = false;

    try {
      const drainSink = pull.drain(null, null);

      drainSink(null, function (end, data) {
        if (end === error) {
          errorThrown = true;
        }
      });

      drainSink(error, function (end) {
        if (end === error) {
          setTimeout(() => {
            if (!errorThrown) {
              done.fail('Error should have been thrown');
            } else {
              done();
            }
          }, 0);
        }
      });
    } catch (e) {
      errorThrown = true;
      done();
    }
  });
});