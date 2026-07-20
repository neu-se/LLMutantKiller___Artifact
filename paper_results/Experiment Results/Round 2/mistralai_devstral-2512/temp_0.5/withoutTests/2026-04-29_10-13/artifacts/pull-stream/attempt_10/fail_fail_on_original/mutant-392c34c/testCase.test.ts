import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink error handling", () => {
  it("should handle true error value correctly", (done) => {
    const callback = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };

    const sink = find((data: any) => false, callback);
    sink(true);
  });
});