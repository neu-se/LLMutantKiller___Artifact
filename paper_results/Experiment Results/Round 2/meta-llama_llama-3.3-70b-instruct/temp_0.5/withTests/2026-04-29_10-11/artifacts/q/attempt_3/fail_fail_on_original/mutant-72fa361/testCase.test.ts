import { Q } from "../../../../../q.js";

describe("makeStackTraceLong function", () => {
    it("should modify the error stack trace", () => {
        Q.longStackSupport = true;

        const error = new Error("Test error");
        const promise = Q.reject(error);

        const originalStackTrace = error.stack;
        Q.nextTick(() => {
            promise.catch((err: any) => {
                expect(err.stack).not.toBe(originalStackTrace);
            });
        });
    });
});