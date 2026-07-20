import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection function", () => {
    it("should remove the promise from unhandledRejections and unhandledReasons arrays", () => {
        Q.resetUnhandledRejections();
        const promise = Q.reject("test");
        const index = Q.unhandledRejections.indexOf(promise);
        expect(index).not.toBe(-1);
        Q.untrackRejection(promise);
        expect(Q.unhandledRejections.indexOf(promise)).toBe(-1);
        expect(Q.unhandledReasons.length).toBe(0);
    });
});