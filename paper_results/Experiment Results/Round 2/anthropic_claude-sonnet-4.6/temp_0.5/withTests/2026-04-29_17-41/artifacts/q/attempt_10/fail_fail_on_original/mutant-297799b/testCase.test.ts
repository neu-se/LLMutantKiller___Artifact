import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering", () => {
  it("mutation keeps more lines than original", () => {
    Q.longStackSupport = true;

    const d = Q.defer();
    (d.promise as any).stack = "at someFunction (usercode.js:1:1)";
    (d.promise as any).stackCounter = 1;

    const fakeError = {
      stack: "Error: test\n    at userFunc (userfile.js:5:10)\n    at Module._compile (module.js:456:26)"
    };

    const p = d.promise.then(null, function(err: any) {
      Q.longStackSupport = false;
      const stack = err.stack || "";
      const lines = stack.split("\n").filter((l: string) => l.trim().length > 0);
      // Original: keeps only "(module.js:" lines → 1 line ("at Module._compile (module.js:456:26)")
      // Mutation: keeps all non-internal lines → 3+ lines
      // So original should have FEWER lines than mutation
      // Check that we have exactly the node-internal lines
      expect(lines.length).toBe(1);
      expect(lines[0]).toContain("module.js");
    });

    d.reject(fakeError);
    return p;
  });
});