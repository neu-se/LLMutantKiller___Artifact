import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should notify the progress listener if threw is false", () => {
        const deferred = Q.defer();
        let notified = false;
        const promise = deferred.promise.then(
            () => { },
            () => { },
            () => {
                notified = true;
            }
        );
        deferred.resolve();
        return promise.then(
            () => {
                expect(notified).toBe(true);
            }
        );
    });
});