import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
    it("should throw an error when progress callback throws an exception", () => {
        let threw = false;
        const promise = Q.delay(10).then(() => {
            throw new Error("Test error");
        });
        promise.progress(() => {
            throw new Error("Progress error");
        }).catch((error) => {
            threw = true;
            expect(error.message).toBe("Progress error");
        });
        expect(threw).toBe(false); // The test will fail here if the mutation is present
    });
});