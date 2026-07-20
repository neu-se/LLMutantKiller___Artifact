import path from "path";
import { createRequire } from "module";

describe("Q module captureLine early return when hasStacks is false", () => {
  it("should load successfully when Error objects have no stack property", () => {
    const OriginalError = global.Error;
    
    // Create a fake Error constructor that produces errors without stack traces
    // This makes hasStacks = false inside the Q module
    function FakeError(this: any, msg?: string) {
      this.message = msg || "";
      // Intentionally no `stack` property
    }
    FakeError.prototype = Object.create(OriginalError.prototype);
    FakeError.prototype.constructor = FakeError;
    
    global.Error = FakeError as any;
    
    jest.resetModules();
    
    let loadError: Error | null = null;
    try {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    } catch (e) {
      loadError = e as Error;
    } finally {
      global.Error = OriginalError;
      jest.resetModules();
    }
    
    // Original code: captureLine returns early when !hasStacks, no error
    // Mutated code: captureLine continues, tries e.stack.split() where e.stack is undefined -> TypeError
    expect(loadError).toBeNull();
  });
});