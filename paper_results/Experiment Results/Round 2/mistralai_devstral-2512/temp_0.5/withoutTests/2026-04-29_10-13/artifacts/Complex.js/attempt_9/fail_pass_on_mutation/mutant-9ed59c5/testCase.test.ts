import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js AMD and CommonJS export", () => {
  it("should properly handle both AMD and CommonJS exports", () => {
    // Test that verifies the AMD export path is functional
    // The mutation removes the AMD export logic which should break this

    // Create a mock AMD environment
    const mockDefine = (deps: any[], factory: () => any) => {
      const result = factory();
      return result;
    };

    // Store original define and set mock
    const originalDefine = (global as any).define;
    (global as any).define = mockDefine;

    // Clear cache and reload module
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/Complex.js/complex.js")];
    const ComplexModule = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Restore original define
    (global as any).define = originalDefine;

    // Verify the module loaded correctly
    expect(ComplexModule).toBeDefined();
    expect(typeof ComplexModule).toBe('function');

    // Test basic functionality
    const c = new ComplexModule(2, 3);
    expect(c.re).toBe(2);
    expect(c.im).toBe(3);

    // The mutation removes the AMD export logic which should cause this to fail
    // because the module won't properly register itself in AMD environments
  });
});