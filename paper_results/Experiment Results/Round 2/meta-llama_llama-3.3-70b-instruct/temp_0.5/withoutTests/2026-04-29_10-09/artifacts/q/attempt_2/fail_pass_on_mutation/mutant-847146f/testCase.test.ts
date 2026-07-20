import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have a 'catch' property", () => {
        const promise = Q.resolve();
        expect(promise.catch).toBeInstanceOf(Function);
    });
});