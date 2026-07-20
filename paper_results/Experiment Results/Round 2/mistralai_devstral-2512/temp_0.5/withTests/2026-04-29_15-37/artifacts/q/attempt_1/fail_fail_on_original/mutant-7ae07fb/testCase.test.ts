import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise resolver validation", () => {
  it("should throw TypeError with descriptive message when resolver is not a function", () => {
    expect(() => {
      Q.promise("not a function");
    }).toThrowError(TypeError);

    try {
      Q.promise("not a function");
    } catch (error) {
      expect(error.message).toBe("resolver must be a function.");
    }
  });
});