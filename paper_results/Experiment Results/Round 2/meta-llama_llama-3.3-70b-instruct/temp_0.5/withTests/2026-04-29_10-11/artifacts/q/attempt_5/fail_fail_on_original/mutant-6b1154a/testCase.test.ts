import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should resolve a promise correctly", () => {
        const promise = Q(5);
        return promise.then((value: any) => {
            expect(value).toBe(5);
        });
    });

    it("should reject a promise correctly", () => {
        const promise = Q.reject("error");
        return promise.then((value: any) => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error).toBe("error");
        });
    });

    it("should handle progress correctly", () => {
        const progressSpy = jest.fn();
        const promise = Q((resolve: any) => {
            resolve(5);
        });
        return promise.then((value: any) => {
            expect(value).toBe(5);
        }, (error: any) => {
            expect(true).toBe(false);
        }, progressSpy).then(() => {
            expect(progressSpy).toHaveBeenCalledTimes(0);
        });
    });

    it("should fail when done is called with no arguments", () => {
        const promise = Q(5);
        expect(() => promise.done()).toThrowError();
    });

    it("should test done method with fulfilled promise", () => {
        const promise = Q(5);
        const onFulfilled = jest.fn();
        const onRejected = jest.fn();
        const onProgress = jest.fn();

        promise.done(onFulfilled, onRejected, onProgress);

        expect(onFulfilled).toHaveBeenCalledTimes(1);
        expect(onRejected).toHaveBeenCalledTimes(0);
        expect(onProgress).toHaveBeenCalledTimes(0);
    });
});