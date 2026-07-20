import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js AMD export detection", () => {
  it("should detect AMD export functionality", () => {
    // The mutation breaks AMD support by having an empty if block
    // This test verifies AMD export works by checking if the module can be required
    // and that the exports are properly set up

    // Clear the require cache to ensure fresh import
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/Complex.js/complex.js")];

    // Simulate AMD environment by setting define before requiring
    const originalDefine = global.define;
    let amdCalled = false;
    global.define = function() {
      amdCalled = true;
      return Complex;
    };

    // Require the module
    const ComplexModule = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Restore original define
    global.define = originalDefine;

    // In original code, AMD should be detected and define should be called
    // In mutated code, the empty if block prevents this
    expect(amdCalled).toBe(true);
    expect(ComplexModule).toBeDefined();
    expect(ComplexModule.Complex).toBeDefined();
  });
});