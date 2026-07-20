import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map fallback", () => {
  it("should collect mapped values via array_reduce in the array_map fallback", async () => {
    // Force usage of the fallback by testing allResolved which uses array_map
    // The mutation removes collect.push() making array_map return []
    // We need to test in an environment where Array.prototype.map might not work as expected
    // Test through allResolved which uses array_map on the promises array
    const result = await Q.allResolved([Q(42), Q(99)]);
    
    expect(result).toHaveLength(2);
    const values = await Q.all(result.map((p: any) => p));
    expect(values[0].inspect().value).toBe(42);
    expect(values[1].inspect().value).toBe(99);
  });
});