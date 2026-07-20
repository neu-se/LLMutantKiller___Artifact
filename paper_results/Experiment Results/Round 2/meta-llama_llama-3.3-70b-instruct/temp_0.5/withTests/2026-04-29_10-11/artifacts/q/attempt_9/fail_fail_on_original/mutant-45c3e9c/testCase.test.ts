import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should flush the queue when nextTick is called and then reject", () => {
        const deferred = q.defer();
        const promise = deferred.promise;
        let rejected = false;

        promise.catch(() => {
            rejected = true;
        });

        q.nextTick(() => {
            deferred.reject();
        });

        expect(rejected).toBe(false);

        q.nextTick(() => {
            expect(rejected).toBe(true);
        });

        // Introduce a small delay to ensure the nextTick has a chance to run
        return new Promise(resolve => setTimeout(resolve, 10));
    });
});