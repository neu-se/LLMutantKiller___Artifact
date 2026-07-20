import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial application", () => {
  it("should throw when partial sink is called more than once", () => {
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) return cb(end);
      cb(null, "data");
    };

    const sink = (read: (end: any, cb: (end: any, data?: any) => void) => void) => {
      read(null, (end: any, data: any) => {
        if (end) return;
        if (data !== "data") {
          throw new Error("Unexpected data");
        }
      });
    };

    // Create a partially applied pull function with 3 arguments
    const partialPull = pull(sink, (read: any) => read, (read: any) => read);

    // First call should work
    partialPull(source);

    // Second call should throw TypeError
    expect(() => {
      partialPull(source);
    }).toThrow(TypeError);
  });
});