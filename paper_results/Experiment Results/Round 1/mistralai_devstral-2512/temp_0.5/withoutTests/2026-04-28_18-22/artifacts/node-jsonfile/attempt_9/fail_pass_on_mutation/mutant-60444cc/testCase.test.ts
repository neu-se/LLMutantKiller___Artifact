import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";
import { Buffer } from "buffer";

describe("stripBom", () => {
  it("should handle Buffer objects correctly", () => {
    const buffer = Buffer.from([0xEF, 0xBB, 0xBF, 0x74, 0x65, 0x73, 0x74]); // BOM + "test"
    const result = stripBom(buffer);
    expect(result).toBe("test");
  });
});