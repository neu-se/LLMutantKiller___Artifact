const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle reduce on array with only empty slots", () => {
    // Create an array with only empty slots
    const emptySlotsArray = Array(3); // [empty × 3]

    // This will test the reduce implementation when it encounters empty slots
    // The mutation removes the TypeError throw, which should cause different behavior
    return Q.all(emptySlotsArray).then((result: any) => {
      // With the mutation, this might not throw and return unexpected result
      // Original code should handle this correctly
      expect(result.length).toBe(3);
      expect(result.every((val: any) => val === undefined)).toBe(true);
    });
  });
});