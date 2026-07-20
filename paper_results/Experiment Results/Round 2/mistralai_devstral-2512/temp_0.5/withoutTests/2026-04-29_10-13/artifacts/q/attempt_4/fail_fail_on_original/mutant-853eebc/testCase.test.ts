const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map shim", () => {
  it("should correctly map array elements using the callback function", () => {
    // Access the internal array_map function through the module
    const array_map = qModule.__test_get_array_map || (() => {
      // Extract array_map from the module's internal scope
      const moduleCode = qModule.toString();
      const match = moduleCode.match(/var array_map = uncurryThis\\(([^}]+)\\}/);
      if (!match) throw new Error("Could not extract array_map");
      return eval(`(${match[1]})`);
    })();

    const input = [1, 2, 3];
    const expected = [2, 4, 6];
    const result = array_map(input, function(x: number) { return x * 2; });

    expect(result).toEqual(expected);
  });
});