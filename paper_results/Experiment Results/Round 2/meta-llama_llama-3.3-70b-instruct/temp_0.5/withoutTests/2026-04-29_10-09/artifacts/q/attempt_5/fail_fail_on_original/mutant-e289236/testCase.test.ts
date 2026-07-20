import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should not call the progress listener when the promise is already resolved and messages are present", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const progressListener = jest.fn();
        deferred.resolve("test value");
        deferred.promiseDispatch(void 0, "when", [void 0, progressListener]);
        expect(progressListener).not.toHaveBeenCalled();
    });
});