import { Q } from "../../../../../q.js";

describe("Q", () => {
    it("should correctly handle stack traces in promises", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);

        return promise.catch((err: any) => {
            expect(err.stack).toContain("makeStackTraceLong");
        });
    });
});