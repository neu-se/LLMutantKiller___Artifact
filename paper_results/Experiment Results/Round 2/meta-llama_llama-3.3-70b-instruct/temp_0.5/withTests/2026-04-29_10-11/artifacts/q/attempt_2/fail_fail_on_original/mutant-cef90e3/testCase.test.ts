import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle then correctly", () => {
        const promise = Q(10);
        let thenCalled = false;
        promise.then((value: any) => {
            thenCalled = true;
            expect(value).toBe(10);
        });
        expect(thenCalled).toBe(false); // This line should fail in the mutated code
    });
});