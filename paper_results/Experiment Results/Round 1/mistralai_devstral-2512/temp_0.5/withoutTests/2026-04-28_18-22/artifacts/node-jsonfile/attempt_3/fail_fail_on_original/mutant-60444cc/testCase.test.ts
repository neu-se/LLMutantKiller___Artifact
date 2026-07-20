import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";
import { Buffer } from "buffer";

describe("stripBom", () => {
  it("should not convert non-Buffer strings to UTF-8 when they don't need BOM stripping", () => {
    const input = "test string";
    const result = stripBom(input);
    expect(result).toBe(input);
    expect(result).not.toBe(input.toString('utf8'));
  });
});