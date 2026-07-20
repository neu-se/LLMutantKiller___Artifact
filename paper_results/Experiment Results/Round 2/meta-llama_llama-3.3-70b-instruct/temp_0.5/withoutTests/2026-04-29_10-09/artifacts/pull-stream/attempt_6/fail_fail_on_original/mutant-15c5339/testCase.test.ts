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

    takeStream(null, (end: any, cb: any) => {
      if (end) {
        cb(true, (err: any, data: any) => {
          if (err) {
            done();
          } else {
            done.fail('Expected error');
          }
        });
      } else {
        cb(null, (err: any, data: any) => {
          if (err) {
            done();
          } else {
            done.fail('Expected error');
          }
        });
      }
    });
  });
});