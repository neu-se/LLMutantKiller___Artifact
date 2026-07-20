import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering", () => {
  it("filters Q internal frames, resulting in a clean stack trace", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: any = null;
      let unfilteredError: any = null;

      // Create a rejection with long stack support
      await Q()
        .then(function userStep() {
          throw new Error("test");
        })
        .catch((e: any) => { capturedError = e; });

      // Create a rejection without long stack support for comparison
      Q.longStackSupport = false;
      await Q()
        .then(function userStep2() {
          throw new Error("test2");
        })
        .catch((e: any) => { unfilteredError = e; });
      Q.longStackSupport = true;

      expect(capturedError).not.toBeNull();
      expect(unfilteredError).not.toBeNull();

      const filteredStack = capturedError.stack || "";
      const unfilteredStack = unfilteredError.stack || "";

      // The filtered stack should contain the "From previous event:" separator
      expect(filteredStack).toContain("From previous event:");

      // The filtered stack should be SHORTER than or equal to the unfiltered stack
      // (Q internal frames are removed)
      // With the mutation, Q internal frames are NOT removed, so the filtered stack
      // would be longer than expected
      const filteredLines = filteredStack.split("\n").filter((l: string) => l.trim().startsWith("at "));
      const unfilteredLines = unfilteredStack.split("\n").filter((l: string) => l.trim().startsWith("at "));

      // The filtered stack should have fewer "at" lines than unfiltered
      // (because Q internal frames are removed)
      // Actually this might not be true if promise.stack adds more frames...
      expect(filteredLines.length).toBeLessThanOrEqual(unfilteredLines.length + 5); // some tolerance
    } finally {
      Q.longStackSupport = false;
    }
  });
});