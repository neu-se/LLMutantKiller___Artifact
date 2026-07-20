import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce fallback sparse array handling in Q.any", () => {
  it("skips holes in sparse arrays so Q.any resolves with the actual promise value", async () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    jest.resetModules();
    // Re-require Q after removing Array.prototype.reduce to use fallback
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    Array.prototype.reduce = originalReduce;

    // sparse[0] is a hole, sparse[1] is a real promise
    const sparse: any[] = new Array(2);
    sparse[1] = QFresh.resolve("expected");

    const result = await QFresh.any(sparse);
    expect(result).toBe("expected");
  });
});