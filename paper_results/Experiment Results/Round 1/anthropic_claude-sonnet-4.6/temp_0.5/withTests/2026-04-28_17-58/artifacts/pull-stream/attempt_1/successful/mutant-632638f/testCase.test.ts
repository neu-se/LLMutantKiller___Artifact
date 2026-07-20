import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop utility", () => {
  it("should return a function that accesses the named property on an object when key is a string", () => {
    const accessor = prop("name");
    expect(typeof accessor).toBe("function");
    const data = { name: "Alice", age: 30 };
    expect(accessor(data)).toBe("Alice");
  });
});