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
      expect(Q.captureLine()).not.toBeNull();
    } else {
      expect(Q.captureLine()).toBeNull();
    }
  });
});