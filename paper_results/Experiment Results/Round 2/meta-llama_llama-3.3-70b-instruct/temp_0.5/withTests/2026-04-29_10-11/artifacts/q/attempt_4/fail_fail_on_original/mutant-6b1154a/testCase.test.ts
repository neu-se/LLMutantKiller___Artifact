import { Q } from "../../../q.js";

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
});