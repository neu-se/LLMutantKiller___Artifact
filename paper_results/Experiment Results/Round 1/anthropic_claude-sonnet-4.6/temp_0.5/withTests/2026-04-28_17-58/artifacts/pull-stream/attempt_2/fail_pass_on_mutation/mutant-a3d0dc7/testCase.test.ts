import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should return data on normal read when abort is null", (done) => {
    const read = values([1, 2, 3]);

    // A normal read (abort = null) should yield the first element, not abort
    read(null, (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(1);
      done();
    });
  });
});