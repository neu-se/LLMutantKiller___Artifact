import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should collect all values from array without aborting", (done) => {
    const results: any[] = [];
    const read = values([1, 2, 3], undefined);

    function readNext() {
      read(null, (err: any, value: any) => {
        if (err === true) {
          // End of stream
          expect(results).toEqual([1, 2, 3]);
          done();
        } else if (err) {
          done(err);
        } else {
          results.push(value);
          readNext();
        }
      });
    }

    readNext();
  });
});