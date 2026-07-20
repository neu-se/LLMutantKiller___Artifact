import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect the mutation in the nextTick function", () => {
        const promise = Q.delay(10);
        expect(promise.isPending()).toBe(true);
        return promise.then(() => {
            expect(promise.isFulfilled()).toBe(true);
        });
    });
});