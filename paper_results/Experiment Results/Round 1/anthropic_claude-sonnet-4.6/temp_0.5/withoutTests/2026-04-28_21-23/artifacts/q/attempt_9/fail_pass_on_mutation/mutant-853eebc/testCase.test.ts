import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allResolved", () => {
  it("should return promises array where each promise is fulfilled", async () => {
    const promises = [1, 2, 3];
    
    // Suppress deprecation warning
    const warn = console.warn;
    console.warn = () => {};
    
    const result = await Q.allResolved(promises);
    
    console.warn = warn;
    
    expect(result).toHaveLength(3);
    
    const values = await Q.all(result.map((p: any) => p.then((v: any) => v)));
    expect(values).toEqual([1, 2, 3]);
  });
});