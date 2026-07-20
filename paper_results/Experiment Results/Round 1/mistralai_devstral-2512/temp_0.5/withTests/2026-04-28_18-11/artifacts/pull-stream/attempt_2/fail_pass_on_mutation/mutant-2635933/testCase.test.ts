import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream with object stream handling", () => {
  it("should handle object streams correctly", (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(null, { value: 1 });
    };

    const sink = (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end);
          if (data && typeof data === 'object' && data.value === 1) {
            cb(null, data);
          } else {
            cb(new Error("Unexpected data"));
          }
        });
      };
    };

    const read = pull(source, sink);

    read(null, (end: any, data: any) => {
      if (end) {
        done(new Error("Stream ended unexpectedly"));
        return;
      }
      if (data && data.value === 1) {
        done();
      } else {
        done(new Error("Unexpected data received"));
      }
    });
  });
});