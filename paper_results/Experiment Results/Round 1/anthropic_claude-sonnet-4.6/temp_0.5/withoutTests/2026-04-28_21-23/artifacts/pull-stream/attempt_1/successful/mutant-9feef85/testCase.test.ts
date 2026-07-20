import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values with null/undefined array", () => {
  it("should call cb(true) when array is null/falsy and abort is false", (done) => {
    const source = values(null);
    source(false, (err: any, data: any) => {
      expect(err).toBe(true);
      done();
    });
  });
});