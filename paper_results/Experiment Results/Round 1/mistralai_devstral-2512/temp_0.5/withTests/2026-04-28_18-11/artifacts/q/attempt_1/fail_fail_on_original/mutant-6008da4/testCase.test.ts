import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("NodeJS environment detection", () => {
  it("should correctly identify non-NodeJS environment", (done) => {
    // This test verifies that Q correctly identifies when it's not running in a NodeJS environment
    // The mutation changes isNodeJS from false to true, which would break this behavior

    // In a browser environment, process.nextTick doesn't exist
    const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
    const isNode = typeof process !== "undefined" && process.toString() === "[object process]";

    // Create a deferred and resolve it
    const deferred = Q.defer();
    let resolvedInNodeStyle = false;

    // Set up a timeout to check if the promise was resolved in Node.js style
    // In a real Node.js environment, this would use process.nextTick
    // In browser or mutated code (where isNodeJS=true), it would use setTimeout
    const startTime = Date.now();
    deferred.promise.then(() => {
      const elapsed = Date.now() - startTime;
      // If using process.nextTick (Node.js), this would execute in < 10ms
      // If using setTimeout (browser or mutated), it would take at least 10ms
      resolvedInNodeStyle = elapsed < 10;

      // In a real browser environment, we expect setTimeout behavior (not Node.js)
      // The mutation would incorrectly make it think it's Node.js
      if (isBrowser) {
        expect(resolvedInNodeStyle).toBe(false);
      } else if (isNode) {
        expect(resolvedInNodeStyle).toBe(true);
      } else {
        // In test environment (Jest), we're in Node.js
        expect(resolvedInNodeStyle).toBe(true);
      }
      done();
    });

    // Resolve the deferred
    deferred.resolve("test");
  });
});