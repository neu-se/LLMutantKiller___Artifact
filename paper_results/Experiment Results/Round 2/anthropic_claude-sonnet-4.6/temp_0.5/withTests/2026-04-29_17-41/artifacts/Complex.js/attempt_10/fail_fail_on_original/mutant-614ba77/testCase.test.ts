import * as fs from "fs";
import * as path from "path";

describe("Complex module exports", () => {
  it("should have 'default' property pointing to the Complex constructor", () => {
    const complexPath = path.resolve(__dirname, "../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    const code = fs.readFileSync(complexPath, "utf8");
    const module = { exports: {} as any };
    const fn = new Function("module", "exports", "require", code);
    fn(module, module.exports, require);
    const Complex = module.exports;
    expect(Complex['default']).toBe(Complex);
  });
});