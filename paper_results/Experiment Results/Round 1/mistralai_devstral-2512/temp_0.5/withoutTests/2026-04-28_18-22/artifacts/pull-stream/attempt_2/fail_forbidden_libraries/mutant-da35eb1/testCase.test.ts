const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");
const pull = require("pull-stream");

describe("find sink mutation test", () => {
  it("should call callback with error when stream ends without match", (done) => {
    const testFn = (x: any) => x === 3;
    const callback = (err: Error | null, data: any) => {
      expect(err).toBeInstanceOf(Error);
      expect(data).toBeNull();
      done();
    };

    const source = pull.values([1, 2]);
    const sink = find(testFn, callback);

    pull(source, sink);
  });
});