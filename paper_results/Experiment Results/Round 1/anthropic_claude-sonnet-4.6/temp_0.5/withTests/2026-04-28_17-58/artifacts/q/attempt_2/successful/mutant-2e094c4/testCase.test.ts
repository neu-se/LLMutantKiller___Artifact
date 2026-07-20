import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering in filterStackString", () => {
  it("filters node internal frames from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      // Build a deferred promise chain so that makeStackTraceLong is invoked
      // on an error whose stack contains node-internal-looking lines.
      const d1 = Q.defer<void>();

      // Create the error with node-internal frames in its stack
      const errorWithNodeFrames = new Error("sentinel error");
      errorWithNodeFrames.stack =
        "Error: sentinel error\n" +
        "    at userCode (userfile.js:42:7)\n" +
        "    at Module._compile (module.js:999:30)\n" +
        "    at Object.Module._extensions..js (node.js:1234:10)\n" +
        "    at anotherUserCode (anotherfile.js:7:3)";

      let resultError: Error | null = null;

      // Chain: d1 resolves -> then throws our crafted error -> caught by fail handler
      // The fail handler receives the error after makeStackTraceLong processes it
      const promise = d1.promise
        .then(function triggerRejection() {
          // Return a rejected promise so the rejection handler in .then() is invoked
          // which triggers makeStackTraceLong(exception, self)
          return Q.reject(errorWithNodeFrames);
        })
        .then(
          null,
          function captureError(err: Error) {
            resultError = err;
            return null;
          }
        );

      d1.resolve();
      await promise;

      expect(resultError).not.toBeNull();
      const stack = resultError!.stack ?? "";

      // Original behavior: isNodeFrame returns true for "(module.js:" and "(node.js:" lines,
      // so filterStackString removes them from the concatenated stack.
      // Mutant behavior: isNodeFrame always returns false, so those lines are NOT removed.
      expect(stack).not.toContain("(module.js:");
      expect(stack).not.toContain("(node.js:");

      // The user code frames should still be present (they are not node-internal)
      expect(stack).toContain("userfile.js");
    } finally {
      Q.longStackSupport = false;
    }
  });
});