import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";
import { Buffer } from "buffer";

describe("stripBom", () => {
  it("should handle Buffer input correctly and not affect non-Buffer strings", () => {
    const buffer = Buffer.from("test string");
    const string = "test string";
    expect(stripBom(buffer)).toBe("test string");
    expect(stripBom(string)).toBe(string);
  });
});