import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream object stream handling", () => {
  it("should correctly process object streams with both source and sink", (done) => {
    const testStream = {
      source: function (abort: any, cb: (end: any, data?: any) => void) {
        if (abort) return cb(abort);
        cb(null, "data1");
      },
      sink: function (read: (abort: any, cb: (end: any, data?: any) => void) => void) {
        read(null, (end: any, data: any) => {
          if (end) return;
        });
      }
    };

    const results: string[] = [];
    pull(
      testStream,
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
          expect(results).toEqual(["data1"]);
          done();
        });
      }
    );
  });
});