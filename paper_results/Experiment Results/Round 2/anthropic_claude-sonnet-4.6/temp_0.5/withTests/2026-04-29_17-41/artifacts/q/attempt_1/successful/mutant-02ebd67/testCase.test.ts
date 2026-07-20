import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("should correctly advance a generator using 'next' verb, resolving the async function result", () => {
    const asyncFn = Q.async(function* () {
      const a = yield Q(1);
      const b = yield Q(2);
      return a + b;
    });

    return asyncFn().then((result: number) => {
      expect(result).toBe(3);
    });
  });
});