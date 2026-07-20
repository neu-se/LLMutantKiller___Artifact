import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("promise stack portion should only contain node frames with original isNodeFrame", async () => {
    Q.longStackSupport = true;
    const deferred = Q.defer();
    deferred.reject(new Error("test"));
    const err = await deferred.promise.then(null, (e: any) => e);
    const stack: string = err?.stack || "";
    
    // Split at the separator
    const parts = stack.split("From previous event:");
    if (parts.length < 2) {
      // No separator - makeStackTraceLong didn't add promise stack
      expect(parts.length).toBeGreaterThanOrEqual(2);
      return;
    }
    
    const promiseStackPart = parts[parts.length - 1];
    const atLines = promiseStackPart.split("\n")
      .filter((l: string) => l.trim().startsWith("at "));
    
    // Original: only (module.js: or (node.js: lines from promise stack kept
    // Mutation: ALL non-internal lines from promise stack kept
    const allAreNodeFrames = atLines.every((l: string) =>
      l.includes("(module.js:") || l.includes("(node.js:")
    );
    expect(allAreNodeFrames).toBe(true);
  });
});