import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should create a promise with inspect function that returns state", () => {
        const promise = Q.defer().promise;
        expect(promise.inspect().state).not.toBe("unknown");
    });
});