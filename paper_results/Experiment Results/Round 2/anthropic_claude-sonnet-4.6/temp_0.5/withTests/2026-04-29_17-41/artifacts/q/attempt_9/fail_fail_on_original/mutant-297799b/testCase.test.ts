import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering", () => {
  it("original isNodeFrame produces empty stack when no node-internal frames exist", () => {
    Q.longStackSupport = true;
    
    const d = Q.defer();
    
    // Override promise.stack with content that has NO node-internal frames
    (d.promise as any).stack = "at someFunction (usercode.js:1:1)\nat anotherFunction (usercode.js:2:2)";
    (d.promise as any).stackCounter = 1;
    
    // Create error with NO node-internal frames
    const fakeError = {
      stack: "Error: test\n    at userFunc (userfile.js:5:10)\n    at anotherFunc (anotherfile.js:20:3)"
    };
    
    const p = d.promise.then(null, function(err: any) {
      Q.longStackSupport = false;
      const stack = err.stack || "";
      // Concatenated stack has ONLY user frames (no (module.js: or (node.js:))
      // Original isNodeFrame: ALL lines filtered out → result = ""
      // Mutation (return true): ALL non-internal lines kept → result has content
      expect(stack).toBe("");
    });
    
    d.reject(fakeError);
    return p;
  });
});