import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream with object stream handling", () => {
  it("should correctly handle object streams with source and sink properties", (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      const data = { value: 1, source: () => {}, sink: () => {} };
      cb(null, data);
    };

    const read = pull(source);

    read(null, (end: any, data: any) => {
      if (end) {
        done(new Error("Stream ended unexpectedly"));
        return;
      }
      if (data && typeof data === 'object' && data.value === 1) {
        done();
      } else {
        done(new Error("Unexpected data received"));
      }
    });
  });
});