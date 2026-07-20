import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as path from "path";
import * as fs from "fs";

describe("filterStackString", () => {
  it("should filter Q internal frames from long stack traces", async () => {
    Q.longStackSupport = true;

    // Find the q.js filename as it would appear in stack traces
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const qBasename = path.basename(qPath); // "q.js"

    try {
      let capturedError: Error | null = null;

      // Build a promise chain that will trigger makeStackTraceLong
      // We need a rejection that propagates through .then() so _rejected is called
      const deferred = Q.defer();

      const promise = deferred.promise.then(function step1() {
        return Q.when(true);
      }).then(function step2() {
        return Q.when(true);  
      });

      deferred.reject(new Error("intentional rejection"));

      await promise.catch((err: Error) => {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as unknown as Error).stack || "";

      // With original: internal Q frames filtered out → q.js not in filtered stack lines
      // With mutated: !isInternalFrame || (!isNodeFrame && line) means internal frames
      // (isInternalFrame=true, isNodeFrame=false) evaluate as:
      // !true || (!false && line) = false || line = line (truthy → included)
      // So q.js internal frames appear in the stack with the mutation
      
      const stackLines = stack.split("\n");
      const qInternalLines = stackLines.filter((line: string) => 
        line.includes(qBasename) && line.includes("at ")
      );

      // Original: Q internal frames are filtered, so no q.js "at" lines should appear
      // Mutation: Q internal frames pass through, so q.js "at" lines will appear
      expect(qInternalLines.length).toBe(0);
    } finally {
      Q.longStackSupport = false;
    }
  });
});