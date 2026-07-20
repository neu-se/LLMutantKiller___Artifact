import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering in long stack traces", () => {
  it("filtered stack should only contain node-internal frame lines", () => {
    Q.longStackSupport = true;

    const d = Q.defer();
    const error = new Error("test");

    const p = d.promise.then(null, function(err: any) {
      Q.longStackSupport = false;
      const stack: string = err.stack || "";
      const lines = stack.split("\n").filter((line: string) => line.trim().startsWith("at "));
      
      // With original isNodeFrame: only lines with "(module.js:" or "(node.js:" are kept
      // With mutated isNodeFrame (return true): ALL non-internal lines are kept
      // So in original, every "at" line must match node-internal pattern
      // In mutation, lines from user/test files also appear
      const nonNodeLines = lines.filter((line: string) =>
        !line.includes("(module.js:") && !line.includes("(node.js:")
      );
      
      expect(nonNodeLines.length).toBe(0);
    });

    d.reject(error);
    return p;
  });
});