import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join error message", () => {
  it("should include the specific error message when joining two different values", async () => {
    const x = "valueA";
    const y = "valueB";
    
    let errorMessage: string | undefined;
    
    try {
      await Q.join(x, y);
    } catch (err: any) {
      errorMessage = err.message;
    }
    
    expect(errorMessage).toBeDefined();
    expect(errorMessage).toContain("Q can't join: not the same:");
  });
});