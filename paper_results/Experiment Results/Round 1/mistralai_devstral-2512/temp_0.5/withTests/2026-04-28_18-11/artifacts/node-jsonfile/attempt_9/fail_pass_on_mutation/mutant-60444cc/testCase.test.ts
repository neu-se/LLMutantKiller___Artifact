import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should not attempt toString on non-Buffer objects", () => {
    const mockObject = { toString: () => { throw new Error("Should not call toString"); } };
    expect(() => stripBom(mockObject)).toThrow();
  });
});