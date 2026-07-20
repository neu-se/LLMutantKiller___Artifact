import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior", () => {
  it("should filter out Q internal frames from error stack traces when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    try {
      let capturedStack = "";

      await new Promise<void>((resolve) => {
        Q().then(() => {
          throw new Error("test error");
        }).fail((err: Error) => {
          capturedStack = err.stack || "";
          resolve();
        });
      });

      // With original filterStackString: lines from q.js internals are removed by isInternalFrame
      // With mutated code (if (true)): ALL lines kept, including q.js internal frames
      // So the mutated stack will contain "q.js" references from internal frames
      // while the original will not contain them (they get filtered out)
      const lines = capturedStack.split("\n").filter(line => line.trim() !== "");
      const hasQInternalLines = lines.some(line => 
        line.includes("q.js") && !line.includes("test error")
      );
      
      expect(hasQInternalLines).toBe(false);
    } finally {
      Q.longStackSupport = false;
    }
  });
});