import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should return a promise when given a function", () => {
        const promise = q(function (resolve) {
            resolve();
        });
        expect(promise.then).toBeInstanceOf(Function);
    });
});