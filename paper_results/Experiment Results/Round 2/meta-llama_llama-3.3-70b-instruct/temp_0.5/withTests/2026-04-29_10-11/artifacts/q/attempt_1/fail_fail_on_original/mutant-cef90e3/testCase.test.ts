import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should handle then correctly", () => {
        const promise = Q(10);
        let thenCalled = false;
        promise.then((value) => {
            thenCalled = true;
            expect(value).toBe(10);
        });
        expect(thenCalled).toBe(true);
    });
});