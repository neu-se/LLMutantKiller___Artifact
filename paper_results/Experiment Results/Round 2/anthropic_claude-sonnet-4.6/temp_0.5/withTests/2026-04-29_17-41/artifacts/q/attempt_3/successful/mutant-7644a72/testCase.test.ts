import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("QReturnValue uses global ReturnValue when defined", () => {
  it("Q.return throws an instance of the global ReturnValue constructor when ReturnValue is defined", () => {
    // Define a custom ReturnValue constructor globally before re-requiring Q
    function MyReturnValue(this: any, value: any) {
      this.value = value;
    }
    (global as any).ReturnValue = MyReturnValue;

    // Clear the module cache and re-require Q so it picks up the global ReturnValue
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[qPath];
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Clean up global
    delete (global as any).ReturnValue;

    // Also clear cache again to avoid polluting other tests
    delete require.cache[qPath];

    let thrown: any = null;
    try {
      freshQ["return"](42);
    } catch (e) {
      thrown = e;
    }

    expect(thrown).not.toBeNull();
    expect(thrown.value).toBe(42);
    // In original code: QReturnValue === global ReturnValue (MyReturnValue), so instanceof works
    // In mutated code: QReturnValue is the local fallback, NOT MyReturnValue, so instanceof fails
    expect(thrown instanceof MyReturnValue).toBe(true);
  });
});