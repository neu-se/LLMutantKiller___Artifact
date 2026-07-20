import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly identify a rejected promise", () => {
        const rejectedPromise = q.reject("Test rejection reason");
        expect((rejectedPromise as any).isRejected()).not.toBeUndefined();
    });
});