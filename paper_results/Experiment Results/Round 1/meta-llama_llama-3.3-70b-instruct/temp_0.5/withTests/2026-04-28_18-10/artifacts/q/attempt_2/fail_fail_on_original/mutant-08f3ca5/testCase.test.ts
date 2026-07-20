import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the progress listener even if an error is thrown", () => {
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
                expect(progressed).toBe(true);
            },
            () => {
                expect(progressed).toBe(true);
            }
        );
    });
});