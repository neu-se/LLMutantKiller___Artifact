import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source - normal read without abort", () => {
  it("should emit values when called with null abort (not aborting)", (done) => {
    const read = values([1, 2, 3], undefined);

    read(null, (err: any, value: any) => {
      expect(err).toBeNull();
      expect(value).toBe(1);
      done();
    });
  });
});