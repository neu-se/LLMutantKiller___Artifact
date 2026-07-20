import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js AMD export detection", () => {
  it("should detect AMD export functionality", () => {
    // Store original define
    const originalDefine = (global as any).define;

    // Create a mock AMD define function that tracks calls
    let amdDefineCalled = false;
    (global as any).define = function(deps: any[], factory: () => any) {
      amdDefineCalled = true;
      return factory();
    };

    // Clear module cache and reload
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/Complex.js/complex.js")];
    const ComplexModule = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Restore original define
    (global as any).define = originalDefine;

    // The mutation removes the AMD export logic, so this should fail
    expect(amdDefineCalled).toBe(true);

    // Also verify the module still works
    const c = new ComplexModule(1, 1);
    expect(c.re).toBe(1);
    expect(c.im).toBe(1);
  });
});