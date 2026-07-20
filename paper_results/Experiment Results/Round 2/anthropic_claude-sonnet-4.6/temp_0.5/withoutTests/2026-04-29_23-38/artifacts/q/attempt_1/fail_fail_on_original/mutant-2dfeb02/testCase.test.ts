import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue close behavior", () => {
  it("should reject get() with the specific error passed to close()", async () => {
    const queue = Queue();
    const specificError = new Error("specific test error");
    
    const getPromise = queue.get();
    queue.close(specificError);
    
    try {
      await getPromise;
      fail("Expected promise to be rejected");
    } catch (err) {
      // In original code: error = error || new Error(...) keeps specificError
      // In mutated code: error = true, so err would be true (not the specificError)
      expect(err).toBe(specificError);
      expect(err instanceof Error).toBe(true);
      expect((err as Error).message).toBe("specific test error");
    }
  });
});