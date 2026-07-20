import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("unhandled rejection reporting", () => {
    it("reports unhandled rejections", () => {
        const promise = Q.reject(new Error("Test error"));
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons().length).toBe(0);
        Q.nextTick(() => {
            expect(Q.getUnhandledReasons().length).toBe(1);
        });
    });
});