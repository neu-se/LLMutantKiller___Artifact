import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create a promise with a stack trace", () => {
        let hasStacks = false;
        try {
            throw new Error();
        } catch (e: any) {
            hasStacks =!!e.stack;
        }
        Q.longStackSupport = true;
        const promise = Q.reject(new Error("Test Error"));
        expect(promise.isRejected()).toBe(true);
        if (hasStacks) {
            expect(promise.inspect().reason.stack).not.toContain("captureLine");
        }
    });
});