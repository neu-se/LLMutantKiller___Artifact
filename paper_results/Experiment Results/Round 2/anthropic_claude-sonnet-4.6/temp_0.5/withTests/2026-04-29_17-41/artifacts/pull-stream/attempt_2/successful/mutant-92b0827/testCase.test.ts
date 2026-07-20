import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce without initial value", () => {
  it("should pass actual error to callback when source immediately ends with an error", (done) => {
    const expectedError = new Error("stream error");

    // Source that immediately signals an error (not true, but an actual Error)
    const errorSource = (_end: any, cb: (end: any, data?: any) => void) => {
      cb(expectedError);
    };

    const sink = (reduce as any)(
      (acc: any, data: any) => acc + data,
      (err: any, _val: any) => {
        // Original code: err === expectedError (because end !== true)
        // Mutated code: err === null (because true ? null : end always gives null)
        expect(err).toBe(expectedError);
        done();
      }
    );

    // When called with 2 args, reduce returns a function that takes a source
    sink(errorSource);
  });
});