import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take function', () => {
  it('should correctly handle the last parameter when terminating', (done) => {
    const test = (data: any) => {
      return false;
    };

    const opts = {
      last: true,
    };

    const takeStream = take(test, opts);

    takeStream(null, (end: any, cb: any) => {
      if (end) {
        cb(end);
      } else {
        cb(null, 'test');
      }
    });

    takeStream(true, (end: any, cb: any) => {
      if (end) {
        cb(end);
      } else {
        cb(null, 'test');
      }
    });

    done();
  });
});