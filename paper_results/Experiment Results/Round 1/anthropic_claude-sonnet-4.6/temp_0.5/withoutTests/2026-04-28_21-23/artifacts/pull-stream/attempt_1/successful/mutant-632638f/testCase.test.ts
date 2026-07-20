import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js"

describe("prop utility function", () => {
  it("should return a function that extracts the value at the given string key from an object", () => {
    const getter = prop("name");
    expect(typeof getter).toBe("function");
    const result = (getter as Function)({ name: "Alice", age: 30 });
    expect(result).toBe("Alice");
  });
});