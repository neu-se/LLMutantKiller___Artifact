import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should handle null input without error", () => {
    const result = stripBom(null);
    expect(result).toBe("null");
  });
});