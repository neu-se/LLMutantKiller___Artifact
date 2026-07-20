import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream with object stream", () => {
  it("should handle object streams correctly", (done) => {
    const testObject = { a: 1, b: 2, c: 3 };
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(null, testObject);
      cb(true); // End the stream
    };

    const sink = (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) {
            cb(end);
          } else {
            cb(null, data);
          }
        });
      };
    };

    const result: any[] = [];
    const collector = (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) {
            try {
              expect(result).toEqual([testObject]);
              done();
            } catch (err) {
              done(err);
            }
          } else {
            result.push(data);
            cb(null);
          }
        });
      };
    };

    pull(
      source,
      sink,
      collector
    );
  }, 10000); // Increased timeout to 10 seconds
});