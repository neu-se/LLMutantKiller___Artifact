import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should handle Buffer input with BOM correctly", () => {
    const bufferWithBom = Buffer.from("\uFEFF{\"name\":\"test\"}", "utf8");
    const result = stripBom(bufferWithBom);
    expect(result).toBe("{\"name\":\"test\"}");
  });
});