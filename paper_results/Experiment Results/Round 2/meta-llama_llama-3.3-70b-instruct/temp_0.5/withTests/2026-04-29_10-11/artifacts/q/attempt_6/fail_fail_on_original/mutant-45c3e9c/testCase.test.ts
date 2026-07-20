import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should flush the queue when nextTick is called and then reject", (done) => {
        const deferred = q.defer();
        const promise = deferred.promise;
        let resolved = false;
        let rejected = false;

        promise.then(() => {
            resolved = true;
        }).catch(() => {
            rejected = true;
        });

        q.nextTick(() => {
            deferred.reject();
        });

        q.nextTick(() => {
            q.nextTick(() => {
                expect(resolved).toBe(false);
                expect(rejected).toBe(true);
                done();
            });
        });
    });
});