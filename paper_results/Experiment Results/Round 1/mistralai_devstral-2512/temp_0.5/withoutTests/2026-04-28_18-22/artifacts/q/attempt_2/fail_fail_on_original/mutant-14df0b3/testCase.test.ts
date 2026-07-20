import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
  it("should return a promise when called", () => {
    const testObject = { prop: "value" };
    const result = Q["delete"](testObject, "prop");
    expect(result).toBeInstanceOf(Object);
    expect(typeof result.then).toBe("function");
  });
});