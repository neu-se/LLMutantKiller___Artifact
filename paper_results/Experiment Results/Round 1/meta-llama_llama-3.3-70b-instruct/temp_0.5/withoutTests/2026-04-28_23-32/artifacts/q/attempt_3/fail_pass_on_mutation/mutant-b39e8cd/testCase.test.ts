import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly identify a rejected promise", () => {
        const rejectedPromise = Q.reject("Test rejection reason");
        expect(rejectedPromise.inspect().state).toBe("rejected");
    });
});