import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source with null input", () => {
  it("should immediately end the stream when array is null", (done) => {
    const read = values(null, undefined);

    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});