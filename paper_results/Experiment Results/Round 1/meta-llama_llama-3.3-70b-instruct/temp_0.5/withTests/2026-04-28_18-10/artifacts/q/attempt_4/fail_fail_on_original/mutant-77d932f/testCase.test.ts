import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle errors correctly", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        promise.catch((err: any) => {
            expect(err).toBeInstanceOf(Error);
        });
    });
});