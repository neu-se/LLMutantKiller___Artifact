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

    takeStream(null, (end: any, data: any) => {
      if (end) {
        if (end!== true) {
          done();
        } else {
          done.fail('Expected end to be false');
        }
      } else {
        count++;
        takeStream(true, (end: any, data: any) => {
          if (end!== true) {
            done.fail('Expected end to be true');
          } else {
            done();
          }
        });
      }
    });
  });
});