import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
  it("should handle the mutation in the captureLine function", () => {
    var hasStacks = false;
    try {
      throw new Error();
    } catch (e: any) {
      hasStacks = !!e.stack;
    }
    if (hasStacks) {
      expect(function() { Q.captureLine(); }).not.toThrow();
    } else {
      expect(function() { Q.captureLine(); }).not.toThrow();
    }
  });
});