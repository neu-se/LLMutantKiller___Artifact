import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream partial sink error handling", () => {
  it("should throw TypeError when partial sink is called more than once", () => {
    const partialSink = pull((read: any) => {
      // First call should work
      const result1 = read(null, (end: any, data: any) => {});
      // Second call should throw
      expect(() => {
        read(null, (end: any, data: any) => {});
      }).toThrow(TypeError);
    });

    // Create a simple source to test with
    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(null, "test");
    };

    // This should trigger the partial sink behavior
    expect(() => {
      partialSink(source);
      partialSink(source);
    }).toThrow(TypeError);
  });
});