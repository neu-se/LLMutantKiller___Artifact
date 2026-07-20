import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should preserve non-Buffer string type", () => {
    const input = "test string";
    const result = stripBom(input);
    expect(result).toBe(input);
    expect(typeof result).toBe("string");
    expect(Buffer.isBuffer(result)).toBe(false);
  });
});