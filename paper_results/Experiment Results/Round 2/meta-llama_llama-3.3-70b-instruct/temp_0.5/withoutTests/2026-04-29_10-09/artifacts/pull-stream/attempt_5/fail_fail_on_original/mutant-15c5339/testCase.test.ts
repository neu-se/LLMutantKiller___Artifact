import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take function', () => {
  it('should correctly handle the last parameter when terminating', (done) => {
    const test = (data: any) => {
      return true;
    };

    const opts = {
      last: true,
    };

    const takeStream = take(test, opts);

    let count = 0;

    takeStream(null, (err: any) => {
      if (err) {
        done.fail('Expected no error');
      } else {
        takeStream(true, (err: any) => {
          if (err) {
            done.fail('Expected no error');
          } else {
            done();
          }
        });
      }
    });
  });
});