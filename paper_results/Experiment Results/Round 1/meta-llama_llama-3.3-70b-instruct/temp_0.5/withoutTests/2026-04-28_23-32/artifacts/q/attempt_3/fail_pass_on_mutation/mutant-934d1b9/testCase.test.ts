import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should resolve a promise when the input is already resolved", () => {
        const promise = Q("test");
        return promise.then((value: any) => {
            expect(value).toBe("test");
        });
    });
});