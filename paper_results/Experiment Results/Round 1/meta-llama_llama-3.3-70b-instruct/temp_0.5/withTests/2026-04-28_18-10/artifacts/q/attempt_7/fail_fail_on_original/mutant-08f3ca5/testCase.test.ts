import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should not notify the progress listener if threw is true", () => {
        const deferred = Q.defer();
        let notified = false;
        const promise = deferred.promise.then(
            () => { },
            () => { },
            () => {
                notified = true;
                throw new Error("Test error");
            }
        );
        deferred.resolve();
        return promise.then(
            () => {
                expect(notified).toBe(false);
            },
            () => {
                expect(notified).toBe(true);
            }
        );
    });
});