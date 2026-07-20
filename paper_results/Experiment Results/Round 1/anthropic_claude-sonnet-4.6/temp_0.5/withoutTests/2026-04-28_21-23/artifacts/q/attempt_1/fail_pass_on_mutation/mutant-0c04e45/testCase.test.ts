import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with generators", () => {
  it("should correctly execute async generator and return resolved value", async () => {
    const asyncFn = Q.async(function* () {
      const a = yield Q(1);
      const b = yield Q(2);
      return a + b;
    });

    const result = await asyncFn();
    expect(result).toBe(3);
  });
});