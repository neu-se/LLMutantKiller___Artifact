import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
  it("should handle the mutation in the captureLine function", () => {
    var hasStacks = false;
    try {
      throw new Error();
    } catch (e) {
      hasStacks = !!e.stack;
    }
    if (hasStacks) {
      expect(Q.captureLine()).not.toBeUndefined();
    } else {
      expect(Q.captureLine()).toBeUndefined();
    }
  });
});