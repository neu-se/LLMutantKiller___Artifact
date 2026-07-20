import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise chain", () => {
  it("fulfills with correct value through then chain", async () => {
    const result = await Q(1).then((v: number) => v + 1).then((v: number) => v * 3);
    expect(result).toBe(6);
  });
});