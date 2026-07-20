import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue close behavior", () => {
  it("should reject get() with the specific error passed to close()", async () => {
    const queue = Queue();
    const specificError = new Error("specific test error");
    
    const getPromise = queue.get();
    queue.close(specificError);
    
    let caughtError: any;
    try {
      await getPromise;
      throw new Error("Expected promise to be rejected but it resolved");
    } catch (err) {
      caughtError = err;
    }
    
    // In original code: error = error || new Error(...) keeps specificError
    // In mutated code: error = true, so caughtError would be true (not the specificError)
    expect(caughtError).toBe(specificError);
    expect(caughtError instanceof Error).toBe(true);
    expect(caughtError.message).toBe("specific test error");
  });
});