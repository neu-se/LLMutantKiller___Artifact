import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop function with RegExp key", () => {
  it("should return a function that extracts the first match when key is a RegExp", () => {
    const regex = /test(\d+)/;
    const data = "This is a test123 string";
    const getValue = prop(regex);
    const result = getValue(data);
    expect(result).toBe("test123");
  });
});