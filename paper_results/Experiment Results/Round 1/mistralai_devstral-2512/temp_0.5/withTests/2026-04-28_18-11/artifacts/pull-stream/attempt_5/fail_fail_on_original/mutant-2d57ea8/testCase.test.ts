const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function error message validation", () => {
  it("should throw TypeError with descriptive message when partial sink is called multiple times", () => {
    let errorMessage: string | undefined;

    const partialSink = pull(function (read: any) {
      return function (abort: any, cb: any) {
        if (abort) return cb(abort);
        // First call should work
        read(null, () => {});
        // Second call should trigger the error
        try {
          read(null, () => {});
        } catch (err: any) {
          errorMessage = err.message;
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

    // Verify the error message
    expect(errorMessage).toBe("partial sink should only be called once!");
  });
});