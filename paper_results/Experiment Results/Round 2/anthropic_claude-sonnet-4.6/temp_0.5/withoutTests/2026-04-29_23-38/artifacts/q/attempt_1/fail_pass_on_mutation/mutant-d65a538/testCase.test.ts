import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module basic functionality", () => {
  it("should load and resolve a simple promise correctly", async () => {
    // If the module fails to load due to the mutation causing a TypeError
    // in captureLine, this test will fail
    expect(typeof Q).toBe("function");
    
    const result = await Q.Promise(function(resolve: (v: number) => void) {
      resolve(42);
    });
    
    expect(result).toBe(42);
  });
});