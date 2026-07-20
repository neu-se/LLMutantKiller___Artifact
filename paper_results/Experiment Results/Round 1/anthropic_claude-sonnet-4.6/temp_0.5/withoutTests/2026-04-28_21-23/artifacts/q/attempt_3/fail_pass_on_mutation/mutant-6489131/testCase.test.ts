import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.when", () => {
  it("chains fulfilled values correctly through multiple thens", async () => {
    const result = await Q.when(5, x => x * 2, null).then(x => x + 1);
    expect(result).toEqual(11);
  });
});