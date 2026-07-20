import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle promise rejection correctly", () => {
        const promise = Q.reject("Test error");
        expect.assertions(1);
        promise.then(null, (error: any) => {
            expect(error).toBe("Test error");
        });
    });
});