const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");
const { Readable } = require("stream");

describe("find sink mutation test", () => {
  it("should call callback with error when stream ends without match", (done) => {
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
        this.push(null);
      }
    });

    const sink = find(testFn, callback);
    readable.pipe(sink);
  });
});