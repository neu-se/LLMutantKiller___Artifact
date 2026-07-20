import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;

        Q.onerror = jest.fn();

        deferred.reject(new Error("Test error"));

        expect(Q.getUnhandledReasons().length).toBe(1);

        promise.catch(() => {});

        expect(Q.getUnhandledReasons().length).toBe(0);

        Q.resetUnhandledRejections();

        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});