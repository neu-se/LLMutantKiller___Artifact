import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("long stack trace filtered result should be empty for non-node-internal frames", () => {
    Q.longStackSupport = true;

    try {
      // Create a chain so makeStackTraceLong gets called with a promise that has a .stack
      const d = Q.defer();
      const error = new Error("test");
      
      // The promise chain: when rejected handler is invoked, makeStackTraceLong
      // is called which calls filterStackString on the concatenated stacks.
      // filterStackString uses isNodeFrame to decide which lines to keep.
      // Original: only "(module.js:" or "(node.js:" lines kept → result is empty in modern Node
      // Mutation: all lines kept → result has user frames
      
      const result = d.promise.then(null, function(err: Error) {
        // After makeStackTraceLong ran, err.stack has been replaced with filtered content
        // Original: filtered stack = only node-internal lines = empty in modern Node.js
        // Mutation: filtered stack = all non-internal lines = has content
        const stack = err.stack || "";
        const lines = stack.split("\n").filter((l: string) => l.trim().length > 0);
        // In original: stack is empty (no node-internal frames in modern Node)
        // In mutation: stack has user frames
        expect(lines.length).toBe(0);
      });

      d.reject(error);
      return result;
    } finally {
      Q.longStackSupport = false;
    }
  });
});