const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull stream mutation detection", () => {
  it("should correctly handle object streams with falsy values", (done) => {
    const testStream = {
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

    const result: any[] = [];
    const read = pull(
      testStream.source,
      testStream,
      pull.drain(
        function (data: any) {
          result.push(data);
        },
        function (err: any) {
          expect(err).toBeFalsy();
          expect(result).toEqual([0]);
          done();
        }
      )
    );

    read(null, function (end: any, data: any) {
      if (!end) read(null, function () {});
    });
  });
});