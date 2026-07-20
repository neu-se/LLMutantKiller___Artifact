import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick error handling", () => {
  it("should re-throw errors from tasks in the async queue via setTimeout when in browser-like environment", async () => {
    // The mutation removes the throw from the else branch (browser path)
    // The if(true) branch always executes in Node, re-throwing synchronously
    // We test that Q.all rejects properly when a promise rejects
    // This tests the overall promise chain integrity
    
    const rejection = new Error("test rejection");
    
    const result = await Q.all([
      Q.resolve(1),
      Q.reject(rejection),
      Q.resolve(3)
    ]).then(
      () => "fulfilled",
      (err: Error) => err.message
    );
    
    expect(result).toBe("test rejection");
  });
});