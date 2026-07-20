import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream object handling", () => {
  it("should process object streams correctly", (done) => {
    let processed = false;

    // Create a stream that is an object (not a function)
    const objectStream = {
      source: (abort: any, cb: (end: any, data?: any) => void) => {
        if (abort) return cb(abort);
        cb(null, "test data");
        cb(true);
      },
      sink: (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
        processed = true;
        return read;
      }
    };

    pull(
      objectStream,
      (read: any) => {
        return (abort: any, cb: (end: any, data?: any) => void) => {
          read(abort, (end: any, data: any) => {
            if (end) {
              try {
                expect(processed).toBe(true);
                done();
              } catch (err) {
                done(err);
              }
            } else {
              cb(null, data);
            }
          });
        };
      }
    );
  });
});