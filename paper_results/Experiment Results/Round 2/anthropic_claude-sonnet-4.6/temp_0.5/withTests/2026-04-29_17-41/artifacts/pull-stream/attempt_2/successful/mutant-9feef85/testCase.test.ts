import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe("values with null input", () => {
  it("should call cb with true when null array is passed and abort is falsy", (done) => {
    const read = values(null, undefined);
    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});