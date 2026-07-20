import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should handle non-Buffer input without conversion", () => {
    const input = "test string";
    const result = stripBom(input);
    expect(result).toBe(input);
    expect(result).toBeTypeOf("string");
    expect(() => {
      // This will throw if result is a Buffer (which can't be directly compared with string)
      if (result !== input) throw new Error("Type mismatch");
    }).not.toThrow();
  });
});