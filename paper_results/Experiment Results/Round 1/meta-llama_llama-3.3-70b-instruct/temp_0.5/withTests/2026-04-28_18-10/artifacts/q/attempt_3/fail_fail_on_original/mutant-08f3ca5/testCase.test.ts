import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should not call the progress listener if an error is thrown in the progress callback and then is true", () => {
        const deferred = Q.defer();
        let progressed = false;
        const promise = deferred.promise.then(
            () => { },
            () => { },
            () => {
                progressed = true;
                throw new Error("Test error");
            }
        );
        deferred.resolve();
        return promise.then(
            () => {
                expect(progressed).toBe(false);
            },
            () => {
                expect(progressed).toBe(true);
            }
        );
    });
});