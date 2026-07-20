import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should flush the queue when nextTick is called and then reject", (done) => {
        const deferred = q.defer();
        const promise = deferred.promise;
        let rejected = false;

        promise.catch(() => {
            rejected = true;
        });

        q.nextTick(() => {
            deferred.reject();
        });

        q.nextTick(() => {
            expect(rejected).toBe(false);
            q.nextTick(() => {
                expect(rejected).toBe(true);
                done();
            });
        });
    }, 10000);
});