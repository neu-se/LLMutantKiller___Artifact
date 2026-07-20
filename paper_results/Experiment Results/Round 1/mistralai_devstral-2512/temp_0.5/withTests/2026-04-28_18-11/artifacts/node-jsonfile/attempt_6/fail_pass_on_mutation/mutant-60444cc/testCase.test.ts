import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should not convert non-Buffer strings to Buffer", () => {
    const testString = "test";
    const result = stripBom(testString);
    expect(result).toBe(testString);
    expect(result).not.toBeInstanceOf(Buffer);
  });
});