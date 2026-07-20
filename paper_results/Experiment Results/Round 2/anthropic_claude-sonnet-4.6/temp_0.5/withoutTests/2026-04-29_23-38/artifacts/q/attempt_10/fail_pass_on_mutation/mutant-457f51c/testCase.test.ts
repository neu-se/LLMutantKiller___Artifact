import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loads correctly", () => {
  it("Q function exists and creates promises that work with all()", async () => {
    const promises = [Q(1), Q(2), Q(3)];
    const results = await Q.all(promises);
    expect(results).toEqual([1, 2, 3]);
  });
});