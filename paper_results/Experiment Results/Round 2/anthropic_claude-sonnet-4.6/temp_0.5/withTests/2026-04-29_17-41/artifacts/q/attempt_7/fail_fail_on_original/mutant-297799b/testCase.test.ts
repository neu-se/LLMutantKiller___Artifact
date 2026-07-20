import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering", () => {
  it("filterStackString removes non-node-internal lines with original isNodeFrame", () => {
    Q.longStackSupport = true;

    const d = Q.defer();
    
    // Use a plain object as the "error" - its stack property is a regular writable property
    // Object.defineProperty will definitely work on it
    const fakeError = {
      stack: "Error: test\n    at userFunc (userfile.js:5:10)\n    at anotherFunc (anotherfile.js:20:3)"
    };

    const p = d.promise.then(null, function(err: any) {
      Q.longStackSupport = false;
      const stack = err.stack || "";
      // makeStackTraceLong checks: typeof error === "object" && error !== null && error.stack
      // fakeError satisfies all these
      // Original isNodeFrame: "userfile.js" and "anotherfile.js" don't match → filtered out
      // Also "Error: test" doesn't match → filtered out
      // d.promise.stack lines: if they contain "(module.js:" or "(node.js:", they're kept
      // Otherwise filtered out too
      // Result: only lines with "(module.js:" or "(node.js:" remain
      // In modern Node.js, possibly empty
      
      // The key: "userfile.js" and "anotherfile.js" should NOT be in result (original)
      // But WOULD be in result (mutation)
      expect(stack.includes("userfile.js")).toBe(false);
      expect(stack.includes("anotherfile.js")).toBe(false);
    });

    d.reject(fakeError);
    return p;
  });
});