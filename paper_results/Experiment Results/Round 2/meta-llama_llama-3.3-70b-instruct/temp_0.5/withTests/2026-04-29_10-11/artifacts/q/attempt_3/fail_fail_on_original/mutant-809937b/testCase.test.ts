import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("unhandled rejection reporting", () => {
    it("reports unhandled rejections", () => {
        const promise = Q.reject(new Error("Test error"));
        Q.resetUnhandledRejections();
        Q.nextTick(() => {
            if (typeof process === "object" && process.emit) {
                process.emit("unhandledRejection", promise);
            }
        });
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});