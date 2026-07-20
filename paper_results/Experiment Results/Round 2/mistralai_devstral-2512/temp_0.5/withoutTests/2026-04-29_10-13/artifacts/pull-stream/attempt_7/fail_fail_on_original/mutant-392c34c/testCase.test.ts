import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import { Readable } from "stream";

describe("find sink error handling", () => {
  it("should handle true error value correctly", (done) => {
    const callback = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };

    const source = new Readable({
      objectMode: true,
      read() {
        this.push(null);
      }
    });

    const sink = find((data: any) => false, callback);
    source.pipe(sink);
  });
});