import { promise } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("promise resolver validation", () => {
  it("should throw TypeError with descriptive message when resolver is not a function", () => {
    expect(() => {
      promise("not a function");
    }).toThrowError(TypeError);

    try {
      promise("not a function");
    } catch (error: any) {
      expect(error.message).toBe("resolver must be a function.");
    }
  });
});