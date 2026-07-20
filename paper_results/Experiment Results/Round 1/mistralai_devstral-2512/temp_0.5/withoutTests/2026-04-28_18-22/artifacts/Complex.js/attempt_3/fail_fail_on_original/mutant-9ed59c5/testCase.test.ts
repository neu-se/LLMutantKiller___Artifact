import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js module export verification", () => {
  it("should have working AMD export support", () => {
    // This test verifies AMD export works by checking if define is called correctly
    // The mutation breaks AMD support by having an empty if block
    const define = jest.fn();
    const originalDefine = global.define;
    global.define = define;

    // Re-import to trigger the export logic
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/Complex.js/complex.js")];
    const ComplexModule = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    expect(define).toHaveBeenCalled();
    expect(ComplexModule).toBeDefined();
    expect(ComplexModule.Complex).toBeDefined();

    global.define = originalDefine;
  });
});