import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink", () => {
  it("should call callback with error when stream ends with an error", (done) => {
    const expectedError = new Error("test error");
    let callCount = 0;

    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      // First read returns an error
      cb(expectedError);
    };

    reduce(
      (acc: any, data: any) => data,
      null,
      (err: any, result: any) => {
        callCount++;
        expect(err).toBe(expectedError);
        expect(callCount).toBe(1);
        done();
      }
    )(source);
  });
});