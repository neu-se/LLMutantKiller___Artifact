const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map shim", () => {
  it("should correctly map array elements using the callback function", () => {
    const input = [1, 2, 3];
    const expected = [2, 4, 6];

    // Directly test the array_map implementation
    const result = Q.array_map(input, function(x: number) { return x * 2; });

    expect(result).toEqual(expected);
  });
});