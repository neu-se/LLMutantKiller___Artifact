import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.longStackSupport", () => {
  it("should be true after module initialization (set by the Q_DEBUG block)", () => {
    expect(Q.longStackSupport).toBe(true);
  });
});