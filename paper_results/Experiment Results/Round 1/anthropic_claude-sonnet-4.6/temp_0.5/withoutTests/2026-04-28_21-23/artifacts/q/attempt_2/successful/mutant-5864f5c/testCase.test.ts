import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator path", () => {
  it("should reject when a regular error is thrown in a SpiderMonkey-style generator", async () => {
    // Define StopIteration to trigger the SpiderMonkey code path
    (global as any).StopIteration = {};
    
    try {
      const error = new Error("test error");
      // Create a fake SpiderMonkey-style generator that throws a regular error
      const fakeGenerator = {
        next: () => { throw error; }
      };
      
      const asyncFn = Q.async(function() {
        return fakeGenerator;
      });
      
      await asyncFn();
      fail("Should have rejected");
    } catch (e) {
      expect((e as Error).message).toBe("test error");
    } finally {
      delete (global as any).StopIteration;
    }
  });
});