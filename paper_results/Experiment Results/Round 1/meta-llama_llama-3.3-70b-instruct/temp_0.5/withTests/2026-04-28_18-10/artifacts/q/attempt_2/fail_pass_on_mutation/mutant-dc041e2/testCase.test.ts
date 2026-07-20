import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should create a promise that resolves to ses", () => {
        var ses = Q();
        expect(ses.isFulfilled()).toBe(true);
    });
});