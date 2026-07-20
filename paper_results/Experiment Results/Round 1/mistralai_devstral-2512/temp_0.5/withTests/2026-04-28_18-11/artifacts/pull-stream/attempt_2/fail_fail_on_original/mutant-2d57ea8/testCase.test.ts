const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function error message validation", () => {
  it("should throw TypeError with descriptive message when partial sink is called multiple times", () => {
    const partialSink = pull(function (read: any) {
      return function (abort: any, cb: any) {
        if (abort) return cb(abort);
        // First call should work
        read(null, () => {});
        // Second call should trigger the error
        try {
          read(null, () => {});
          throw new Error("Expected TypeError was not thrown");
        } catch (err) {
          expect(err instanceof TypeError).toBe(true);
          expect(err.message).toBe("partial sink should only be called once!");
          cb(null);
        }
      };
    });

    // Create a simple read function
    const read = function (abort: any, cb: any) {
      if (abort) return cb(abort);
      cb(null, "data");
    };

    // Execute the partial sink
    partialSink(read)(null, (err: any) => {
      if (err) throw err;
    });
  });
});