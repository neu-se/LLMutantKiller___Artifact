import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should not attempt toString on non-Buffer objects", () => {
    const nonBufferObject = { test: "value" };
    const result = stripBom(nonBufferObject);
    expect(result).toEqual(nonBufferObject);
  });
});