import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should handle number input without throwing error", () => {
    const numberInput = 123;
    const result = stripBom(numberInput);
    expect(result).toBe("123");
  });
});