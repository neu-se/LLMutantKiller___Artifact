import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with RegExp key", () => {
  it("should return a function that extracts regex match from data when given a RegExp", () => {
    const regex = /hello/;
    const getter = prop(regex);

    // The result should be a function
    expect(typeof getter).toBe("function");

    // When called with matching data, it should return the matched string
    const result = getter("say hello world");
    expect(result).toBe("hello");

    // When called with non-matching data, it should return null
    const noMatch = getter("say goodbye world");
    expect(noMatch).toBeNull();
  });
});