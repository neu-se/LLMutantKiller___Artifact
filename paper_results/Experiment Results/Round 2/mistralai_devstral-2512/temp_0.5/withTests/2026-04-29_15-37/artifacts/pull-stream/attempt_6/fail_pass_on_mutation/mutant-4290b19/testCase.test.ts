import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial application", () => {
  it("should correctly handle partial application with exactly 4 arguments", () => {
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

    // Create a partially applied pull function with exactly 4 arguments
    // The mutation changes the loop condition from i < length to i <= length
    // With 4 arguments, the original code will loop 4 times (i=0,1,2,3)
    // The mutated code will loop 5 times (i=0,1,2,3,4) and try to access arguments[4] which is undefined
    const partialPull = pull(sink, (read: any) => read, (read: any) => read, (read: any) => read);

    // This should work without errors in original code
    partialPull(source);
  });
});