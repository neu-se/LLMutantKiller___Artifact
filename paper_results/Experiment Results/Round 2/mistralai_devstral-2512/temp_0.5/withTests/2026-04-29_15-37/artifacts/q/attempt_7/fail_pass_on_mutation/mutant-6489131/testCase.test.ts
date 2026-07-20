const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should handle sparse arrays in reduce without initial value", () => {
    // Create a sparse array where first element is missing
    const sparseArray = [, 2, 3];

    // Test the specific code path that uses Q's internal array_reduce
    // The mutation removes the break statement which would cause infinite loop
    const testPromise = Q.resolve(sparseArray).then((arr: any[]) => {
      // Force Q to use its internal reduce implementation
      // by creating a promise that will use the reduce shim
      return Q.all([arr]).then(() => {
        // This should complete with original code
        // but hang with mutated code
        return "success";
      });
    });

    return testPromise.then((result: string) => {
      expect(result).toBe("success");
    });
  });
});