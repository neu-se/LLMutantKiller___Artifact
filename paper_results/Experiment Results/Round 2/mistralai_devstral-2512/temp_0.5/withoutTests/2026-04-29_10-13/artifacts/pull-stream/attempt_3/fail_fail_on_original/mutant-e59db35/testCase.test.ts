const flatten = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js");

describe("flatten mutation test", () => {
  it("should handle abort with error correctly", (done) => {
    const error = new Error("test error");
    const abortCalledWithError = { value: false };

    const mockRead = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort === error) {
        abortCalledWithError.value = true;
      }
      cb(null);
    };

    const flattenStream = flatten()(mockRead);

    // First call to establish _read
    flattenStream(null, (err: any, data: any) => {
      // Second call with abort and error
      flattenStream(error, (err: any) => {
        expect(abortCalledWithError.value).toBe(true);
        done();
      });
    });
  });
});