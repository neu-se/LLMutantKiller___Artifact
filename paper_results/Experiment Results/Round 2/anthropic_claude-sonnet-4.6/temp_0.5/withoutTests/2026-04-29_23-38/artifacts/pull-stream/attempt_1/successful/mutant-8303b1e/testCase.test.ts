import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js"

describe("prop with regexp key", () => {
  it("should return a function that executes the regexp on data when key is a RegExp", () => {
    const regex = /hello/;
    const fn = prop(regex);
    expect(typeof fn).toBe("function");
    const result = fn("say hello world");
    expect(result).toBe("hello");
  });
});