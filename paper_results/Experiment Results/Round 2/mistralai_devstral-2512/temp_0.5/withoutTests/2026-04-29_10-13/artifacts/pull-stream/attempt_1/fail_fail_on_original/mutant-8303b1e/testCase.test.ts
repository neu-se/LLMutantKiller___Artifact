import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop function with regular expression key", () => {
  it("should return a function that extracts the first match when key is a RegExp", () => {
    const regex = /hello (\w+)/;
    const data = "hello world";
    const getValue = prop(regex);
    const result = getValue(data);
    expect(result).toBe("hello world");
  });
});