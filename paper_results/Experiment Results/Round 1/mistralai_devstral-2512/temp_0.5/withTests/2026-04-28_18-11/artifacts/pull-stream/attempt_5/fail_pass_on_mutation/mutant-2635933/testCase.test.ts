import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream with object stream handling", () => {
  it("should correctly handle streams with both source and sink properties", (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      const data = { value: 1, source: () => {}, sink: () => {} };
      cb(null, data);
    };

    const through = (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, { ...data, processed: true });
        });
      };
    };

    const read = pull(source, through);

    read(null, (end: any, data: any) => {
      if (end) {
        done(new Error("Stream ended unexpectedly"));
        return;
      }
      if (data && data.processed && data.value === 1) {
        done();
      } else {
        done(new Error("Data not processed correctly"));
      }
    });
  });
});