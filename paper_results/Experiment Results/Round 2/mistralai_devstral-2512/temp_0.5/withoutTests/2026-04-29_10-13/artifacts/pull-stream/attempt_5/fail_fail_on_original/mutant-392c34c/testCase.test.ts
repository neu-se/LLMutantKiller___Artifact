import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink error handling", () => {
  it("should call callback with null error when stream ends with true", (done) => {
    const callback = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };

    const sink = find((data: any) => false, callback);
    sink(null, true);
  });
});