const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with source property", () => {
  it("should correctly handle streams with source property", (done) => {
    const sourceStream = {
      source: () => (abort: any, cb: (end: any, data?: any) => void) => {
        if (abort) return cb(abort);
        cb(null, "test-data");
        cb(true); // End the stream immediately
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
    });
  });
});