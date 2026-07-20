import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create a promise with a stack trace", () => {
        try {
            throw new Error();
        } catch (e) {
            const promise = Q.reject(e);
            expect(promise.isRejected()).toBe(true);
            expect(promise.inspect().reason).toBeInstanceOf(Error);
            if (!Q.longStackSupport || !hasStacks) {
                expect(promise.inspect().reason.stack).not.toContain("captureLine");
            } else {
                expect(promise.inspect().reason.stack).toContain("captureLine");
            }
        }
    });
});