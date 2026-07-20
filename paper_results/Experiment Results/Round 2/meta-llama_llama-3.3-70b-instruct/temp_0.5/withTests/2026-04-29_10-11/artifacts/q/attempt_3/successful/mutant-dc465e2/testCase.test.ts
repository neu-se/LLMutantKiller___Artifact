import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise Library", () => {
    it("should resolve the promise after the specified timeout", () => {
        const promise = Q(10).timeout(50);
        return promise.then((value) => {
            expect(value).toBe(10);
        });
    });
});