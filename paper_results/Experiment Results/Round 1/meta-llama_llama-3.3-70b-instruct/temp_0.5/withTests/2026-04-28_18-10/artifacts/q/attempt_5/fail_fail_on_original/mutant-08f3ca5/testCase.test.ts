import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should not notify when threw is true", () => {
        const deferred = Q.defer();
        let notified = false;
        const promise = deferred.promise.then(
            () => { },
            () => { },
            (value) => {
                notified = true;
                throw new Error("Test error");
            }
        );
        deferred.resolve();
        return promise.then(
            () => {
                expect(notified).toBe(true);
            },
            () => {
                expect(notified).toBe(true);
            }
        );
    });
});