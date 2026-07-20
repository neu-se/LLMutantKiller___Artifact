import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream object stream handling", () => {
  it("should correctly handle object streams with null values", (done) => {
    const nullStream = {
      source: function (abort: any, cb: (end: any, data?: any) => void) {
        if (abort) return cb(abort);
        cb(null, null);
      },
      sink: function (read: (abort: any, cb: (end: any, data?: any) => void) => void) {
        read(null, (end: any, data: any) => {
          if (end) return;
        });
      }
    };

    const results: any[] = [];
    pull(
      nullStream,
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
          expect(results).toEqual([null]);
          done();
        });
      }
    );
  });
});