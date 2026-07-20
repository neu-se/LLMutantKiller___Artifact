import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js"

describe("prop utility function", () => {
  it("should return a function that accesses the property by string key", () => {
    const accessor = prop("name");
    expect(typeof accessor).toBe("function");
    const data = { name: "Alice" };
    expect(accessor(data)).toBe("Alice");
  });
});