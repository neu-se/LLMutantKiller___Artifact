import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should handle Buffer input correctly", () => {
    const bufferInput = Buffer.from("test string", "utf8");
    const result = stripBom(bufferInput);
    expect(result).toBe("test string");
  });
});