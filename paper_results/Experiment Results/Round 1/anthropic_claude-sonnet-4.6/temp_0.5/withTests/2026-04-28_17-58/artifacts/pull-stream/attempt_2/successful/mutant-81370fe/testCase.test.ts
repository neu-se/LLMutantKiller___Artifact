import pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull with object-style duplex stream", () => {
  it("should correctly connect through an object stream that has sink and source properties", (done) => {
    const results: number[] = [];

    // Create an object-style through stream (duplex) with sink and source properties
    // This exercises the `else if (s && typeof s === 'object')` branch in pull.js
    let _read: Function;
    const objectThrough = {
      sink: function(read: Function) {
        _read = read;
      },
      source: function(abort: any, cb: Function) {
        _read(abort, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      }
    };

    const values = [1, 2, 3];
    let i = 0;
    const source = function(abort: any, cb: Function) {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // pull(source, objectThrough) should return objectThrough.source
    // because pull sets read = s.source after calling s.sink(read)
    const read = pull(source, objectThrough) as Function;

    read(null, function next(end: any, data: any) {
      if (end) {
        expect(results).toEqual([2, 4, 6]);
        done();
        return;
      }
      results.push(data);
      read(null, next);
    });
  });
});