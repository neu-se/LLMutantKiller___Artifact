import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain error handling', () => {
  it('should throw error when end is not true and no done callback', (done) => {
    const error = new Error('test error');
    let errorThrown = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 'data');
      }
    };

    const drainSink = drain(null, null);

    source(null, (end: any, data: any) => {
      if (end === error) {
        errorThrown = true;
        done();
      }
    });

    source(error, (end: any) => {
      if (end === error) {
        setTimeout(() => {
          if (!errorThrown) {
            done.fail('Error should have been thrown');
          }
        }, 0);
      }
    });
  });
});