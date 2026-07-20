const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function error message validation", () => {
  it("should throw TypeError with descriptive message when partial sink is called multiple times", () => {
    // Create a partial sink
    const partialSink = pull(function (read: any) {
      return function (abort: any, cb: any) {
        if (abort) return cb(abort);
        read(null, () => {});
      };
    });

    // Create a read function that will trigger the error
    const read = function (abort: any, cb: any) {
      if (abort) return cb(abort);
      cb(null, "data");
    };

    // First call should work
    partialSink(read)(null, () => {});

    // Second call should throw the error
    try {
      partialSink(read)(null, () => {});
      throw new Error("Expected TypeError was not thrown");
    } catch (err: any) {
      expect(err instanceof TypeError).toBe(true);
      expect(err.message).toBe("partial sink should only be called once!");
    }
  });
});