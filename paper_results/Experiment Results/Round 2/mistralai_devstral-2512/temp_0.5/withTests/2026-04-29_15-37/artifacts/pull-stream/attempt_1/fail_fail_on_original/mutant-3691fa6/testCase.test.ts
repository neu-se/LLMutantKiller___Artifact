import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop function with regex key", () => {
  it("should correctly handle regex objects as keys", () => {
    const regex = /hello/;
    const data = "hello world";
    const getValue = prop(regex);
    const result = getValue(data);
    expect(result).toBe("hello");
  });
});