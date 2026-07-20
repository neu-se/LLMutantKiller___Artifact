import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should throw an error when Q.makeStackTraceLong is not implemented", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);

        expect(() => {
            // Try to access the stack property of the error
            // This should throw an error if makeStackTraceLong is not implemented
            promise.catch((err: any) => {
                expect(err.stack).toBeUndefined();
            });
        }).toThrowError();
    });
});