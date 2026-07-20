import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should flush the queue when nextTick is called", (done) => {
        const deferred = q.defer();
        const promise = deferred.promise;
        let resolved = false;

        promise.then(() => {
            resolved = true;
        });

        q.nextTick(() => {
            deferred.resolve();
        });

        q.nextTick(() => {
            expect(resolved).toBe(true);
            done();
        });
    });
});