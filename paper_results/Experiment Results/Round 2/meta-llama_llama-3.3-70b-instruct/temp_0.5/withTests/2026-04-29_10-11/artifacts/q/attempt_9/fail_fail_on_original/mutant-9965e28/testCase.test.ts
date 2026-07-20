import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should track rejection with stack trace when reason has a stack property", () => {
        const reason = new Error("Test error");
        const promise = Q.reject(reason);
        expect(promise.isRejected()).toBe(true);
        const unhandledReasons = Q.getUnhandledReasons();
        expect(unhandledReasons.length).toBe(1);
        expect(unhandledReasons[0]).toEqual(reason.stack);
    });

    it("should track rejection without stack trace when reason does not have a stack property", () => {
        const reason = {};
        const promise = Q.reject(reason);
        expect(promise.isRejected()).toBe(true);
        const unhandledReasons = Q.getUnhandledReasons();
        expect(unhandledReasons.length).toBe(1);
        expect(unhandledReasons[0]).not.toBe("(no stack) [object Object]");
    });
});