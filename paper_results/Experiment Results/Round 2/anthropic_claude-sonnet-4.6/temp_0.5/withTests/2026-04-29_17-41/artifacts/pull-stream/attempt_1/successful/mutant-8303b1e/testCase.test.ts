import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return a function that executes the regexp on data and returns the first match", () => {
    const regex = /hello/;
    const accessor = prop(regex);

    // In original code: accessor is a function that runs regex.exec(data) and returns v[0]
    // In mutated code: accessor is the regex itself (not a function), so calling it throws or returns wrong value
    expect(typeof accessor).toBe("function");

    const result = accessor("say hello world");
    expect(result).toBe("hello");

    const noMatch = accessor("say goodbye world");
    expect(noMatch).toBeNull();
  });
});