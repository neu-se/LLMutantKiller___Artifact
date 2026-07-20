import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_map behavior", () => {
  it("should correctly map over promises using Q.all with array of values", async () => {
    // The mutation removes the body of array_map's callback, making it a no-op
    // This means array_map would return an array of undefined values instead of mapped values
    // We can test this through Q.allSettled which uses array_map internally
    
    const promises = [Q(1), Q(2), Q(3)];
    
    const result = await Q.allSettled(promises);
    
    // With the original code, array_map correctly maps promises to their inspected states
    // With the mutated code, array_map returns [undefined, undefined, undefined]
    // which would cause allSettled to fail or return wrong results
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ state: "fulfilled", value: 1 });
    expect(result[1]).toEqual({ state: "fulfilled", value: 2 });
    expect(result[2]).toEqual({ state: "fulfilled", value: 3 });
  });
});