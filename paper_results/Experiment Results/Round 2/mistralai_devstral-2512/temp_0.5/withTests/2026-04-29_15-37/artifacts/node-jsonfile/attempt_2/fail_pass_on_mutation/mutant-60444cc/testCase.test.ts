import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should not convert string to Buffer when it's not a Buffer", () => {
    const input = "test string";
    const result = stripBom(input);
    expect(result).toBe(input);
    expect(typeof result).toBe("string");
  });
});