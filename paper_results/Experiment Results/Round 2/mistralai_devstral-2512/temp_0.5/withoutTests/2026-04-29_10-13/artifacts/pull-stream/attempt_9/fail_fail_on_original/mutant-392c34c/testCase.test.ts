import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink error handling", () => {
  it("should handle true error value correctly", (done) => {
    const callback = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };

    const source = (end: any, cb: any) => {
      if (end) return cb(true);
      cb(null, "test");
    };

    const sink = find((data: any) => false, callback);
    source(null, (end: any, data: any) => {
      if (end) sink(end);
      else sink(null, data);
    });
  });
});