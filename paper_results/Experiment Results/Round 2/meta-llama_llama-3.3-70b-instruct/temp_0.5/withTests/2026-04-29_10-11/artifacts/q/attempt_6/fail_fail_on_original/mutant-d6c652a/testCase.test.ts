import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
  it("should handle the mutation", () => {
    var hasStacks = false;
    try {
      throw new Error();
    } catch (e: any) {
      hasStacks = !!e.stack;
    }
    expect(Q.longStackSupport).toBe(false);
    Q.longStackSupport = true;
    try {
      throw new Error();
    } catch (e: any) {
      hasStacks = !!e.stack;
    }
    expect(hasStacks).toBe(true);
  });
});