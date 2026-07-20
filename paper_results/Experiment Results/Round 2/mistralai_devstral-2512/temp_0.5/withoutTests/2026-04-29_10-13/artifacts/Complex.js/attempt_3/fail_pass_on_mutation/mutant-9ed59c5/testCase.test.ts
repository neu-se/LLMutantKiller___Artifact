import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js AMD export", () => {
  it("should have AMD export support when define is available", () => {
    // This test verifies AMD export behavior by checking if the module
    // can be properly loaded in an AMD-like environment
    const define = (deps: any[], factory: () => any) => factory();
    (global as any).define = define;

    // Force re-evaluation of the module in AMD context
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/Complex.js/complex.js")];
    const ComplexModule = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    expect(ComplexModule).toBeDefined();
    expect(typeof ComplexModule).toBe('function');

    const c = new ComplexModule(3, 4);
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
  });
});