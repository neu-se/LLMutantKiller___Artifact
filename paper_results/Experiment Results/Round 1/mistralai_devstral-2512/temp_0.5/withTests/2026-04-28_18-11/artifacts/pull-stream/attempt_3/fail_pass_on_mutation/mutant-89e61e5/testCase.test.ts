import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream partial sink error handling", () => {
  it("should throw TypeError when partial sink is called more than once", () => {
    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(null, "test");
    };

    const partialSink = pull((read: any) => {
      return function (abort: any, cb: any) {
        if (abort) return cb(abort);
        cb(null, "processed");
      };
    });

    // First call should work
    const read1 = partialSink(source);
    read1(null, (end: any, data: any) => {});

    // Second call should throw TypeError in original code
    // but will not throw in mutated code (empty if block)
    let errorThrown = false;
    try {
      const read2 = partialSink(source);
      read2(null, (end: any, data: any) => {});
    } catch (e) {
      errorThrown = true;
    }

    // In original code, this should be true
    // In mutated code, this will be false
    expect(errorThrown).toBe(true);
  });
});