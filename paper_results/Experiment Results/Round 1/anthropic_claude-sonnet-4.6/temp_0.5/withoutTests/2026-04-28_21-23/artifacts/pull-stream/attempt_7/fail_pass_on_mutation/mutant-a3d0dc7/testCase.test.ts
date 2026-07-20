import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("should return a function (source) when called with a valid array", () => {
    // Original: values([1,2,3]) returns a function
    // Mutated: if(true) fires at setup time, calling abortCb(undefined, undefined, onAbort)
    //          and returning its result (likely undefined), not a function
    const source = values([1, 2, 3]);
    expect(typeof source).toBe('function');
  });
});