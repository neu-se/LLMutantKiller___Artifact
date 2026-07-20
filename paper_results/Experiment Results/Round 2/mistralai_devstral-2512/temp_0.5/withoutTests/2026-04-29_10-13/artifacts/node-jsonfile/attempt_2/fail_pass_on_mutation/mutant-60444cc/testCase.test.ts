import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";
import { Buffer } from "buffer";

describe("stripBom", () => {
  it("should handle Buffer input correctly", () => {
    const buffer = Buffer.from("test string", "utf8");
    const result = stripBom(buffer);
    expect(result).toBe("test string");
  });
});