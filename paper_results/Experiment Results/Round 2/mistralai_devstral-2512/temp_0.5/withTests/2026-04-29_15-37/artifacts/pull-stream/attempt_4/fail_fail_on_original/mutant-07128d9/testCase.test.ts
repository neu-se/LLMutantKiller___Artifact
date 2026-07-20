import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain error handling', () => {
  it('should throw error when end is not true and no done callback', (done) => {
    const error = new Error('test error');
    let errorThrown = false;

    const drainSink = drain(null, null);

    drainSink(null, function (end: any, data: any) {
      if (end === error) {
        errorThrown = true;
      }
    });

    drainSink(error, function (end: any) {
      if (end === error) {
        setTimeout(() => {
          if (errorThrown) {
            done();
          } else {
            done.fail('Error should have been thrown');
          }
        }, 0);
      }
    });
  });
});