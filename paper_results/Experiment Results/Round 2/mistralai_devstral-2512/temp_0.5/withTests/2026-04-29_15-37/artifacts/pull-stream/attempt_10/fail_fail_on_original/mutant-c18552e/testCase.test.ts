const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through onEnd behavior', () => {
  it('should call onEnd with the correct abort value when stream is aborted', (done) => {
    let onEndValue: any = null;
    const results: any[] = [];

    const testThrough = through(
      (data: any) => { results.push(data); },
      (abort: any) => {
        onEndValue = abort;
      }
    );

    let i = 0;
    const values = [1, 2, 3];

    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      if (i < values.length) {
        cb(null, values[i++]);
      } else {
        cb(true);
      }
    };

    const sink = (read: any) => {
      let count = 0;
      (function next(end: any, data: any) {
        if (end) {
          expect(onEndValue).toBe(true);
          done();
        } else {
          count++;
          if (count === 1) {
            read(true, next); // Abort after first value
          } else {
            read(null, next);
          }
        }
      })(null, null);
    };

    pull(source, testThrough, sink);
  });
});