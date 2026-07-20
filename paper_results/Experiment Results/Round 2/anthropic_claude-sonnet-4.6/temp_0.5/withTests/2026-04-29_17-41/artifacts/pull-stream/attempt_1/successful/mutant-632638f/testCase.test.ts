import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop utility function", () => {
  it("should return a function that retrieves the property value from an object when key is a string", () => {
    const getter = prop("name");
    expect(typeof getter).toBe("function");
    const result = getter({ name: "Alice" });
    expect(result).toBe("Alice");
  });
});