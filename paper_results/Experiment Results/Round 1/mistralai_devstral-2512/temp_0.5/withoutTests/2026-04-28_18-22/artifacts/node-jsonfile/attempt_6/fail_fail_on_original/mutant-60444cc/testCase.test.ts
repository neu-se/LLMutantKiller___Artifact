import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";
import { Buffer } from "buffer";

describe("stripBom", () => {
  it("should handle non-Buffer strings without calling toString", () => {
    const mockString = "test";
    const originalToString = mockString.toString;
    let toStringCalled = false;

    mockString.toString = function() {
      toStringCalled = true;
      return originalToString.call(this);
    };

    const result = stripBom(mockString);
    expect(result).toBe("test");
    expect(toStringCalled).toBe(false);
  });
});