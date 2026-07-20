import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create a promise with a stack trace", () => {
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            hasStacks = !!e.stack;
        }
        const promise = Q.reject(new Error());
        expect(promise.isRejected()).toBe(true);
        if (!hasStacks) {
            expect(promise.inspect().reason.stack).toBeUndefined();
        } else {
            expect(promise.inspect().reason.stack).not.toBeUndefined();
        }
    });
});