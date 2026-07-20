import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream object handling", () => {
  it("should correctly handle object streams with source property", (done) => {
    let throughCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      const data = { value: 1, source: () => {} };
      cb(null, data);
    };

    const through = (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        throughCalled = true;
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
      if (throughCalled && data && data.processed && data.value === 1) {
        done();
      } else {
        done(new Error("Through stream not called or data not processed correctly"));
      }
    });
  });
});