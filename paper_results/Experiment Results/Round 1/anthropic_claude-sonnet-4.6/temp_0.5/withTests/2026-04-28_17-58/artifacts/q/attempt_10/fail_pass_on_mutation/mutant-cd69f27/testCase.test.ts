describe("Q module SES integration", () => {
  it("should not set ses.makeQ when ses.ok() returns false, using vm context", () => {
    const vm = require("vm");
    const fs = require("fs");
    const path = require("path");

    const qPath = path.resolve(
      __dirname,
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );
    const qSource = fs.readFileSync(qPath, "utf8");

    // When ses.ok() returns false:
    // Original code: hits `return` inside the outer (definition) wrapper function.
    //   This means the wrapper function exits before reaching the `} else if (window)` branch.
    //   But since ses branch is an else-if, window branch wouldn't run anyway.
    // 
    // The real observable difference: the `return` exits the outer wrapper IIFE.
    // After the entire if/else-if/else chain in the wrapper, there is no more code.
    // So the return is equivalent.
    //
    // HOWEVER: what if we construct a scenario where ses is defined but
    // ses.ok() is false AND window/self are also defined?
    // In original: ses branch taken, return fires, done.
    // In mutated: ses branch taken, empty if body, else skipped, 
    //   but we're still in the else-if chain so window branch NOT taken.
    // Still equivalent.
    //
    // The only way to kill this: ses.ok() false, and something after the if/else
    // in the ses branch. There is nothing. This mutation is equivalent.
    // But let's try the vm approach with ses.ok() = false and window defined
    // to see if mutated falls through to window branch somehow.

    let windowQSet: any = undefined;
    const fakeWindow = {
      get Q() { return windowQSet; },
      set Q(val: any) { windowQSet = val; }
    };

    const ses = {
      ok: () => false,
      makeQ: undefined as any,
    };

    const context = vm.createContext({
      ses,
      window: fakeWindow,
      self: fakeWindow,
      setTimeout,
      clearTimeout,
      setImmediate,
      process,
      console,
    });

    vm.runInContext(qSource, context);

    // In original: ses branch entered, return fires, window.Q never set
    // In mutated: ses branch entered, empty if, no return, 
    //   but else-if chain means window branch not reached, window.Q never set
    // Both: windowQSet should be undefined
    // AND ses.makeQ should be undefined (else was skipped)
    expect(ses.makeQ).toBeUndefined();
    expect(windowQSet).toBeUndefined();
  });
});