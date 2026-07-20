import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q captureLine mutation detection", () => {
  it("handles missing stacks gracefully in captureLine", () => {
    jest.resetModules();
    
    const originalError = global.Error;
    
    // Make Error not produce stacks so hasStacks = false
    function NoStackError(this: Error, msg?: string) {
      this.message = msg || "";
      // no stack property
    }
    NoStackError.prototype = Object.create(Error.prototype);
    (global as any).Error = NoStackError;
    
    let Q2: any;
    let loadError: any;
    try {
      Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } catch(e) {
      loadError = e;
    } finally {
      global.Error = originalError;
    }
    
    // Original: hasStacks=false -> if(!hasStacks){return;} -> captureLine returns undefined safely
    // Mutated:  hasStacks=false -> if(false){} -> tries e.stack.split() -> TypeError -> module crashes
    expect(loadError).toBeUndefined();
    expect(Q2).toBeDefined();
  });
});