import { find } from "./sinks/find.js";

describe("find sink", () => {
  it("should call callback with null error when err is true", (done) => {
    const test = (data: any) => data === "target";
    const cb = (err: Error | null, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };

    const sink = find(test, cb);
    sink.write("other");
    sink.end(true);
  });
});