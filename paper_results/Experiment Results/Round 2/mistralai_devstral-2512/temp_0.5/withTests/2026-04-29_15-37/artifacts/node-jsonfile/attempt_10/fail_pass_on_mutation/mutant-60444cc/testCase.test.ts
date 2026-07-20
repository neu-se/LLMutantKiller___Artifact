import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should not convert non-Buffer strings to Buffer", () => {
    const input = "test string";
    const result = stripBom(input);
    expect(result).toBe(input);
    expect(Buffer.isBuffer(result)).toBe(false);
  });
});