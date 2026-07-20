import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const process = {
            emit: jest.fn(),
        };

        const deferred = Q.defer();
        const promise = deferred.promise;

        deferred.reject(new Error("Test error"));

        expect(Q.getUnhandledReasons().length).toBe(1);

        Q.nextTick.runAfter(() => {
            promise.catch(() => {
                Q.resetUnhandledRejections();
            });
        });

        Q.nextTick.runAfter(() => {
            expect(Q.getUnhandledReasons().length).toBe(0);
        });
    });
});