import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe("values - null array handling", () => {
  it("should end immediately when called with null array without emitting data", (done) => {
    const read = values(null, undefined);
    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});