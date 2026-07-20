const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull stream object handling mutation", () => {
  it("should distinguish between null and object in stream pipeline", (done) => {
    const testStream = {
      source: function (abort: any, cb: any) {
        if (abort) return cb(abort);
        cb(null, null);
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
      function (read: any) {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (!end) result.push(data);
            cb(end, data);
          });
        };
      },
      function (read: any) {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) {
              expect(result).toEqual([null]);
              expect(end).toBeTruthy();
              done();
            }
          });
        };
      }
    );

    read(null, function () {});
  });
});