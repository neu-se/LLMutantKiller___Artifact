const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function error message validation", () => {
  it("should throw TypeError with descriptive message when partial sink is called multiple times", () => {
    // Create a partial sink that will be called twice
    const partialSink = pull(function (read: any) {
      return function (abort: any, cb: any) {
        if (abort) return cb(abort);
        read(null, () => {});
      };
    });

    // Create a read function that will call the sink twice
    const read = function (abort: any, cb: any) {
      if (abort) return cb(abort);
      // First call
      partialSink(read)(null, () => {});
      // Second call should trigger the error
      try {
        partialSink(read)(null, () => {});
        throw new Error("Expected TypeError was not thrown");
      } catch (err: any) {
        expect(err.message).toBe("partial sink should only be called once!");
      }
      cb(null, "data");
    };

    // Execute the read function
    read(null, (err: any) => {
      if (err) throw err;
    });
  });
});