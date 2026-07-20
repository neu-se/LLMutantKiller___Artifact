import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should flush the queue when nextTick is called", () => {
        const deferred = q.defer();
        const promise = deferred.promise;
        let resolved = false;

        promise.then(() => {
            resolved = true;
        });

        deferred.resolve();

        expect(resolved).toBe(false);

        q.nextTick(() => {
            expect(resolved).toBe(true);
        });

        // Add a small delay to ensure the nextTick has a chance to run
        return new Promise(resolve => setTimeout(resolve, 10));
    });
});