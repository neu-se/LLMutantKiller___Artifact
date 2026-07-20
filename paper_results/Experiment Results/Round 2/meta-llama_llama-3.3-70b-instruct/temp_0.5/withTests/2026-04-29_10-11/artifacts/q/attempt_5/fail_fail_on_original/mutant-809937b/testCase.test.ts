import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("unhandled rejection reporting", () => {
    it("reports unhandled rejections", () => {
        const promise = Q.reject(new Error("Test error"));
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.nextTick(() => {
            promise.catch(() => {});
            expect(Q.getUnhandledReasons()).toEqual([]);
        });
    });
});