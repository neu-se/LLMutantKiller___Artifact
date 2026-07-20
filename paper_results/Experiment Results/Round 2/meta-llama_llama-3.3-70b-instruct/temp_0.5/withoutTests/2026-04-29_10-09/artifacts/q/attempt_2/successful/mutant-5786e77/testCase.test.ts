import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly implement the spread method", () => {
        const promise = Q([1, 2, 3]);
        const result = promise.spread((a: number, b: number, c: number) => a + b + c);
        expect(result).resolves.toBe(6);
    });
});