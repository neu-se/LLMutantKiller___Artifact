import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop utility function", () => {
  it("should return a function that accesses the given string key on data objects", () => {
    const accessor = prop("name");
    expect(typeof accessor).toBe("function");
    const result = (accessor as Function)({ name: "Alice" });
    expect(result).toBe("Alice");
  });
});