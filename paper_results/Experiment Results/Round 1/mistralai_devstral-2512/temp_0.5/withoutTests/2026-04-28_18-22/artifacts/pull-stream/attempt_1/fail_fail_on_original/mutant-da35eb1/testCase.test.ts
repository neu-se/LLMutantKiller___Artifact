import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import { Readable } from "stream";

describe("find sink mutation test", () => {
  it("should call callback with error when stream ends without match and err is not true", (done) => {
    const testFn = (x: any) => x === 3;
    const callback = (err: Error | null, data: any) => {
      expect(err).toBeInstanceOf(Error);
      expect(data).toBeNull();
      done();
    };

    const readable = new Readable({
      objectMode: true,
      read() {
        this.push(1);
        this.push(2);
        this.push(null); // End stream without matching data
      }
    });

    const sink = find(testFn, callback);
    readable.pipe(sink);
  });
});