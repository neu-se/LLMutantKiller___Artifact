import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";
import { Buffer } from "buffer";

describe("stripBom", () => {
  it("should not convert non-Buffer strings to UTF-8", () => {
    const nonBufferString = "test";
    const result = stripBom(nonBufferString);
    expect(result).toBe(nonBufferString);
    expect(typeof result).toBe("string");
    expect(result).not.toBeInstanceOf(Buffer);
  });
});