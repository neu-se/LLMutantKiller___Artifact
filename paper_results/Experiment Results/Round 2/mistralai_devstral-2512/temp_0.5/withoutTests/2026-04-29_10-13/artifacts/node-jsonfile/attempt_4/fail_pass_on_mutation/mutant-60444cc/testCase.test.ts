import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";
import { Buffer } from "buffer";

describe("stripBom", () => {
  it("should handle Buffer with BOM correctly", () => {
    const bufferWithBom = Buffer.from("\uFEFFtest string", "utf8");
    const result = stripBom(bufferWithBom);
    expect(result).toBe("test string");
  });
});