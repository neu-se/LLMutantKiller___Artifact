import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import { resolve } from "path";
import { realpathSync } from "fs";

describe("filterStackString mutation detection", () => {
  it("long stack trace should contain meaningful frames after filtering", async () => {
    Q.longStackSupport = true;

    let caughtError: any = null;

    // Create a rejection that goes through Q's then() to trigger makeStackTraceLong
    const deferred = Q.defer();
    
    Q.nextTick(() => {
      deferred.reject(new Error("test rejection"));
    });

    await deferred.promise
      .then(() => {})
      .fail((e: any) => {
        caughtError = e;
      });

    Q.longStackSupport = false;

    expect(caughtError).not.toBeNull();
    const stack: string = caughtError.stack || "";
    
    // With original: internal Q frames filtered out, stack has fewer lines
    // With mutated: ALL lines kept including Q internal frames
    // Count lines containing actual stack frames
    const frameLines = stack.split("\n").filter((l: string) => l.trim().startsWith("at "));
    
    // The original filters internal Q frames, so the frame count should be
    // less than what the mutated version produces
    // We verify by checking that Q-internal frames (Promise.prototype.then, etc.) 
    // are NOT present - they should be filtered by isInternalFrame in original
    const hasQThenFrame = frameLines.some((l: string) => 
      l.includes("Promise.prototype.then") || 
      l.includes("Object.then")
    );
    
    // Original filters these out; mutated keeps them
    expect(hasQThenFrame).toBe(false);
  });
});