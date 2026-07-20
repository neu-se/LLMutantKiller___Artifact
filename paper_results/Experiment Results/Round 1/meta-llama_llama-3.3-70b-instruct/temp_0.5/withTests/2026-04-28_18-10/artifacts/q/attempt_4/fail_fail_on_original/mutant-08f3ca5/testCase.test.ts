import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the progress listener when no error is thrown and then is false", () => {
        const deferred = Q.defer();
        let progressed = false;
        const promise = deferred.promise.then(
            () => { },
            () => { },
            () => {
                progressed = true;
            }
        );
        deferred.resolve();
        return promise.then(
            () => {
                expect(progressed).toBe(true);
            }
        );
    });
});