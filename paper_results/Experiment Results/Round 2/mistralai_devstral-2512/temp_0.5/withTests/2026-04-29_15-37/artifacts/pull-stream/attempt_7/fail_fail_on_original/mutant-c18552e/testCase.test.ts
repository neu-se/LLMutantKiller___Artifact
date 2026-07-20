const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through onEnd behavior', () => {
  it('should call onEnd with null when stream ends normally', (done) => {
    let onEndValue: any = null;
    const results: any[] = [];

    const testThrough = through(
      (data: any) => { results.push(data); },
      (abort: any) => {
        onEndValue = abort;
      }
    );

    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      const values = [1, 2, 3];
      let i = 0;
      const next = () => {
        if (i >= values.length) return cb(true);
        cb(null, values[i++]);
      };
      next();
    };

    const sink = (read: any) => {
      read(null, function next(end: any, data: any) {
        if (end) {
          expect(results).toEqual([1, 2, 3]);
          expect(onEndValue).toBe(null);
          done();
        } else {
          read(null, next);
        }
      });
    };

    pull(source, testThrough, sink);
  });
});