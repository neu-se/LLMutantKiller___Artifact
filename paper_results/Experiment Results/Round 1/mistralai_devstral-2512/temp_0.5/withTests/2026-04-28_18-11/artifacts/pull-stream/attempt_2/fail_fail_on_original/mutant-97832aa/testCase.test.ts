const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull stream object handling", () => {
  it("should correctly handle streams with falsy values", (done) => {
    const falsyStream = {
      source: function (abort: any, cb: any) {
        if (abort) return cb(abort);
        cb(null, 0);
      },
      sink: function (read: any) {
        return function (abort: any, cb: any) {
          if (abort) return cb(abort);
          read(abort, function (end: any, data: any) {
            if (end) return cb(end);
            cb(null, data);
          });
        };
      }
    };

    pull(
      falsyStream.source,
      falsyStream,
      pull.collect(function (err: any, result: any) {
        expect(err).toBeNull();
        expect(result).toEqual([0]);
        done();
      })
    );
  });
});