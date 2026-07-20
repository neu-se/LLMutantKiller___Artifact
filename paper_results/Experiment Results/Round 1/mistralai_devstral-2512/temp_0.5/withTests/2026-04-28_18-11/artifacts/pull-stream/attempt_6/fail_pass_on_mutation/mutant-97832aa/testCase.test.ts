const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull stream mutation detection", () => {
  it("should handle object streams with falsy values correctly", (done) => {
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
          read(abort, function (end: any) {
            expect(result).toEqual([0]);
            expect(end).toBe(null);
            done();
          });
        };
      }
    );

    read(null, function () {});
  });
});