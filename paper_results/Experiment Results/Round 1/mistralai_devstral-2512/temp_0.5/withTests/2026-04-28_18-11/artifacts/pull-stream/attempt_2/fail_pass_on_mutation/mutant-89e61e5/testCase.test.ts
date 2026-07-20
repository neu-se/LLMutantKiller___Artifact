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
    expect(() => {
      const read2 = partialSink(source);
      read2(null, (end: any, data: any) => {});
    }).toThrow(TypeError);
  });
});