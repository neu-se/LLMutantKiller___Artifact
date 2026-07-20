const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly process array with holes using reduce", () => {
    // This test targets the mutation in array_reduce where index is decremented
    // The mutation would cause incorrect behavior when checking array bounds
    const sparseArray = [1, , , 4]; // Array with holes at indices 1 and 2

    return Q(sparseArray).then((arr: any[]) => {
      // Use map which internally uses array_reduce
      return Q.all(arr.map((item: any, index: number) => {
        return Q.resolve({ value: item, index: index });
      }));
    }).then((result: any[]) => {
      // Original code should handle sparse arrays correctly
      expect(result.length).toBe(4);
      expect(result[0].value).toBe(1);
      expect(result[0].index).toBe(0);
      expect(result[1].value).toBeUndefined();
      expect(result[1].index).toBe(1);
      expect(result[2].value).toBeUndefined();
      expect(result[2].index).toBe(2);
      expect(result[3].value).toBe(4);
      expect(result[3].index).toBe(3);
    });
  });
});