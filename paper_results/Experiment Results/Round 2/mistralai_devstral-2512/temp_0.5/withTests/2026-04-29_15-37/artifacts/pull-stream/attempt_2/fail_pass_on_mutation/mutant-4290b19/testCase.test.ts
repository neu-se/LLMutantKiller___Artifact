import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial application", () => {
  it("should correctly handle partial application with multiple arguments", () => {
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

    // This should work without errors
    partialPull(source);

    // Verify the partial function can be called multiple times
    const partialPull2 = pull(sink, (read: any) => read);
    partialPull2(source);
  });
});