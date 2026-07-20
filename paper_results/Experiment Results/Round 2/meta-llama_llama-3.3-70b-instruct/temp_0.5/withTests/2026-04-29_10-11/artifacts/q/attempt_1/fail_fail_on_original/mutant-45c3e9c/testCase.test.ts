import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should flush the queue when nextTick is called", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        let resolved = false;

        promise.then(() => {
            resolved = true;
        });

        deferred.resolve();

        expect(resolved).toBe(false);

        Q.nextTick(() => {
            expect(resolved).toBe(true);
        });
    });
});