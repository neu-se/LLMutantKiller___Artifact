const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe("find sink mutation test", () => {
  it("should call callback with error when stream ends without match", (done) => {
    const testFn = (x: any) => x === 3;
    const callback = (err: Error | null, data: any) => {
      expect(err).toBeInstanceOf(Error);
      expect(data).toBeNull();
      done();
    };

    const source = {
      read: (abort: any, cb: (end: any, data: any) => void) => {
        cb(null, 1);
        cb(null, 2);
        cb(true); // End stream without matching data
      }
    };

    const sink = find(testFn, callback);
    source.read(null, sink);
  });
});