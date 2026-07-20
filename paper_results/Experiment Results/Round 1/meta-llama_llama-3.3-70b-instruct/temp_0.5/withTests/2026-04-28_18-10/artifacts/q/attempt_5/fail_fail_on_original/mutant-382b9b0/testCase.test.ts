import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nodeify function", () => {
    it("should call the callback with the result of the promise", () => {
        const promise = Q(10);
        let called = false;
        promise.nodeify((err: any, result: any) => {
            expect(err).toBeNull();
            expect(result).toBe(10);
            called = true;
        });
        expect(called).toBe(true);
    });

    it("should call the callback with an error if the promise is rejected", () => {
        const promise = Q.reject(new Error("Test error"));
        let called = false;
        promise.nodeify((err: any, result: any) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("Test error");
            expect(result).toBeUndefined();
            called = true;
        });
        expect(called).toBe(true);
    });

    it("should return the promise if no callback is provided", () => {
        const promise = Q(10);
        const result = promise.nodeify();
        expect(result).toBe(promise);
    });
});