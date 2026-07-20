import { createRequire } from "module";

describe("QReturnValue uses global ReturnValue when defined", () => {
  it("Q.return throws an instance of the global ReturnValue constructor when ReturnValue is defined", () => {
    // Define a global ReturnValue before requiring Q
    function ReturnValue(this: any, value: any) {
      this.value = value;
    }
    (global as any).ReturnValue = ReturnValue;

    // Re-require Q so it picks up the global ReturnValue
    const req = createRequire(import.meta.url);
    // Clear cache
    delete req.cache[req.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q = req("../../../../../../../../../../../subject_repositories/q/q.js");

    let thrown: any = null;
    try {
      Q["return"](42);
    } catch (e) {
      thrown = e;
    }

    delete (global as any).ReturnValue;

    expect(thrown).not.toBeNull();
    expect(thrown instanceof ReturnValue).toBe(true);
  });
});