import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink error handling", () => {
  it("should handle true error value correctly", (done) => {
    const callback = jest.fn((err, data) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    });

    const sink = find((data: any) => false, callback);
    sink.write("test");
    sink.end(true);
  });
});