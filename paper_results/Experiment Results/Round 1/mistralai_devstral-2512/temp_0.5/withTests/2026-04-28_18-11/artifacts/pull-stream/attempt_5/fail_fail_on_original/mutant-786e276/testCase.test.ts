const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with source property", () => {
  it("should correctly handle streams with source property", (done) => {
    let callCount = 0;
    const sourceStream = {
      source: () => (abort: any, cb: (end: any, data?: any) => void) => {
        callCount++;
        if (abort) return cb(abort);
        if (callCount === 1) {
          cb(null, "test-data");
        } else {
          cb(true); // End the stream
        }
      }
    };

    const result: any[] = [];
    const read = pull(sourceStream);

    read(null, (end: any, data: any) => {
      if (end) {
        try {
          expect(result).toEqual(["test-data"]);
          done();
        } catch (err) {
          done(err);
        }
        return;
      }
      result.push(data);
      // Read again to trigger the end
      read(null, (end: any, data: any) => {
        if (end) {
          try {
            expect(result).toEqual(["test-data"]);
            done();
          } catch (err) {
            done(err);
          }
        }
      });
    });
  });
});