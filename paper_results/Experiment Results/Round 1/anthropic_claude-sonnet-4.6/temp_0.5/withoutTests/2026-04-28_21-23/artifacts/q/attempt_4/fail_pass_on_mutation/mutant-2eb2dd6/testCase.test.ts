import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("allSettled uses array_map", () => {
  it("should return states of all promises when settled", async () => {
    const promises = [Q(1), Q.reject(new Error("err")), Q(3)];
    const result = await Q.allSettled(promises);
    expect(result).toHaveLength(3);
    expect(result[0].state).toBe("fulfilled");
    expect(result[0].value).toBe(1);
    expect(result[1].state).toBe("rejected");
    expect(result[2].state).toBe("fulfilled");
    expect(result[2].value).toBe(3);
  });
});