const flatten = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js");

describe("flatten mutation test", () => {
  it("should handle abort with error correctly", (done) => {
    const error = new Error("test error");
    const abortValues: any[] = [];

    const mockRead = (abort: any, cb: (err: any, data?: any) => void) => {
      abortValues.push(abort);
      if (abort) {
        cb(null);
      } else {
        // Return a stream that will be flattened
        const mockStream = (abort: any, cb: (err: any, data?: any) => void) => {
          if (abort) {
            cb(abort);
          } else {
            cb(null, "data");
          }
        };
        cb(null, mockStream);
      }
    };

    const flattenStream = flatten()(mockRead);

    // First call to establish _read
    flattenStream(null, (err: any, data: any) => {
      // Second call with abort and error
      flattenStream(error, (err: any) => {
        // The original code should pass the error to read()
        // The mutated code should pass false (error && abort) to read()
        // We expect the last abort call to be the error object
        expect(abortValues[abortValues.length - 1]).toBe(error);
        done();
      });
    });
  });
});