import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q hasStacks mutation detection", () => {
  it("detects initial hasStacks value by making stack access throw during module init", () => {
    jest.resetModules();
    const origError = global.Error;

    function ThrowingStackError(this: any, msg?: string) {
      this.message = msg || "";
      Object.defineProperty(this, "stack", {
        get() {
          throw new origError("no stack for you");
        },
        configurable: true,
      });
    }
    ThrowingStackError.prototype = origError.prototype;
    (global as any).Error = ThrowingStackError;

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