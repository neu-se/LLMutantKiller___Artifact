import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should throw an error when an unhandled rejection occurs", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        expect(() => promise.done()).toThrowError(error);
    });
});