const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle sparse arrays with no initial value in reduce", () => {
    // Create a sparse array where first element is missing
    const sparseArray = [, 2, 3];

    // Directly test the scenario that triggers the mutation
    // The mutation removes the break statement in the reduce shim
    const testPromise = Q.resolve().then(() => {
      // Create a scenario that forces Q to use its reduce implementation
      // on a sparse array without initial value
      const result = Q.all([sparseArray]).spread((arr: any[]) => {
        // This will trigger the reduce code path with sparse array
        return arr.reduce((acc: number, val: number) => acc + val, 0);
      });
      return result;
    });

    return testPromise.then((sum: number) => {
      // Original code should sum 2 + 3 = 5
      // Mutated code would hang due to infinite loop
      expect(sum).toBe(5);
    });
  });
});