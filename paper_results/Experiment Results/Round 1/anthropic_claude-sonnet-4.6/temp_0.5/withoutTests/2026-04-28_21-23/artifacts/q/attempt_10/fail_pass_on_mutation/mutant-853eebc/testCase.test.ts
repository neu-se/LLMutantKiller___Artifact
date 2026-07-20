import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_map via allSettled with array-like", () => {
  it("should handle array-like objects in allSettled", async () => {
    // Create array-like without map method to force fallback path
    const arrayLike = Object.assign(Object.create(null), {
      0: Q.resolve(1),
      1: Q.resolve(2), 
      length: 2
    });
    
    // Convert to real array first since allSettled needs array
    const arr = Array.from(arrayLike);
    
    // Override map on this specific array instance
    const originalMap = arr.map;
    Object.defineProperty(arr, 'map', { value: undefined, configurable: true });
    
    try {
      const result = await Q.allSettled(arr);
      expect(result).toHaveLength(2);
      expect(result[0].state).toBe("fulfilled");
    } finally {
      Object.defineProperty(arr, 'map', { value: originalMap, configurable: true });
    }
  });
});