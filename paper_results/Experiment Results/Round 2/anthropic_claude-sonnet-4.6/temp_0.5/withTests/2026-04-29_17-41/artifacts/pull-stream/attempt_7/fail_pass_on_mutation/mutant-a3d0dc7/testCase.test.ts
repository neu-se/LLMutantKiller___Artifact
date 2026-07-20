import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should return actual value (not undefined) on first normal read", (done) => {
    const read = values([42, 43, 44], undefined);

    read(null, (err: any, value: any) => {
      expect(err).toBeNull();
      expect(value).toBe(42);
      done();
    });
  });
});