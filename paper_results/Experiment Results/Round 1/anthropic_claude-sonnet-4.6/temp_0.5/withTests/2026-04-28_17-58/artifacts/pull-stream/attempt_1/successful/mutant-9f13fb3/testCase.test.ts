import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop utility", () => {
  it("should return a function that accesses data by string key", () => {
    const accessor = prop("name");
    expect(typeof accessor).toBe("function");
    const data = { name: "Alice", age: 30 };
    expect((accessor as Function)(data)).toBe("Alice");
  });
});