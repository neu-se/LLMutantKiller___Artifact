import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should reject with the correct error when progress listener throws", () => {
        const deferred = q.defer();
        const promise = deferred.promise.then(void 0, void 0, () => {
            throw new Error("Progress listener error");
        });

        deferred.notify();

        return promise.then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error.message).toBe("Progress listener error");
        });
    }, 10000);
});