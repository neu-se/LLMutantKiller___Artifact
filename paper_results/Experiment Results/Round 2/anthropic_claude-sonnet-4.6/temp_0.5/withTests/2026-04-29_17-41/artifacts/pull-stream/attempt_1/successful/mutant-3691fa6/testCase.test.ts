import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return a function that extracts matched text when given a RegExp", () => {
    const regex = /hello/;
    const getter = prop(regex);

    // The getter should be a function that applies exec and returns the match
    expect(typeof getter).toBe("function");

    // When called with a string containing a match, it should return the matched string
    const result = getter("say hello world");
    expect(result).toBe("hello");

    // When called with a string that doesn't match, it should return null
    const noMatch = getter("say goodbye world");
    expect(noMatch).toBeNull();
  });
});