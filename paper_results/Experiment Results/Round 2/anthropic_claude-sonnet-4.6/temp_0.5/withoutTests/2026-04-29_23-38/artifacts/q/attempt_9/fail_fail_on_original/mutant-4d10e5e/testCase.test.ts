import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q hasStacks mutation detection", () => {
  it("detects initial hasStacks value by making first Error stack access throw", () => {
    jest.resetModules();
    const origError = global.Error;
    let callCount = 0;

    function SelectiveThrowError(this: any, msg?: string) {
      callCount++;
      const currentCall = callCount;
      this.message = msg || "";
      if (currentCall === 1) {
        // First Error: stack getter throws, so hasStacks stays at initial value
        Object.defineProperty(this, "stack", {
          get() {
            throw new origError("no stack");
          },
          configurable: true,
        });
      } else {
        // Subsequent Errors: normal stack
        const e = new origError(msg);
        this.stack = e.stack;
      }
    }
    SelectiveThrowError.prototype = origError.prototype;
    (global as any).Error = SelectiveThrowError;

    let freshQ: any;
    try {
      freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      (global as any).Error = origError;
    }

    freshQ.longStackSupport = true;
    const deferred = freshQ.defer();

    // Original: hasStacks starts false, !!e.stack throws -> hasStacks stays false
    //           -> longStackSupport + hasStacks=false -> no stack on promise
    // Mutant:   hasStacks starts true, !!e.stack throws -> hasStacks stays true
    //           -> longStackSupport + hasStacks=true -> stack captured on promise
    expect(deferred.promise.stack).toBeUndefined();
  });
});