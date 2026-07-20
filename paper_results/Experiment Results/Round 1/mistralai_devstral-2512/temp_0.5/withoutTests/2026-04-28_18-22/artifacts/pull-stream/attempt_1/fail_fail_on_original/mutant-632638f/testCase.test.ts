import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop function behavior", () => {
  it("should return a function that retrieves the value at the specified key", () => {
    const getName = prop("name");
    const testObject = { name: "test" };
    expect(getName(testObject)).toBe("test");
  });
});