import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should result in a fulfilled promise when given a value", () => {
        const promise = Q(5);
        expect(promise.inspect().state).toBe("fulfilled");
        expect(promise.inspect().value).toBe(5);
    });

    it("should return a promise with valueOf function", () => {
        const promise = Q(5);
        expect(promise.valueOf).toBeInstanceOf(Function);
    });
});