import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";
import { Buffer } from "buffer";

describe("stripBom", () => {
  it("should not modify non-Buffer strings", () => {
    const input = "test string";
    const result = stripBom(input);
    expect(result).toBe(input);
    expect(result).toBeTypeOf("string");
  });
});