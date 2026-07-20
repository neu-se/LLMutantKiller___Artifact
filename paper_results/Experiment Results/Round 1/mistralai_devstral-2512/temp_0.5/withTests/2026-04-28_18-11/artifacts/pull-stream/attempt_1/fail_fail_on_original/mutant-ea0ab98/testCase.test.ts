import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop function with regex key", () => {
  it("should return the first match when key is a regex", () => {
    const regex = /hello (\w+)/;
    const data = "hello world";
    const getter = prop(regex);
    const result = getter(data);
    expect(result).toBe("hello world");
  });
});