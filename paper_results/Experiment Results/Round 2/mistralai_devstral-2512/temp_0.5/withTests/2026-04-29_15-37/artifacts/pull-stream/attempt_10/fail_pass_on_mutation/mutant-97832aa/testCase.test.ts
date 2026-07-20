import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream object stream handling", () => {
  it("should correctly handle object streams with falsy values", (done) => {
    const falsyStream = {
      source: function (abort: any, cb: (end: any, data?: any) => void) {
        if (abort) return cb(abort);
        cb(null, 0); // Using 0 as falsy value
      },
      sink: function (read: (abort: any, cb: (end: any, data?: any) => void) => void) {
        read(null, (end: any, data: any) => {
          if (end) return;
        });
      }
    };

    const results: any[] = [];
    pull(
      falsyStream,
      function (read: any) {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (!end) results.push(data);
            cb(end, data);
          });
        };
      },
      function (read: any) {
        read(null, function (end: any) {
          expect(results).toEqual([0]);
          done();
        });
      }
    );
  });
});