import { Q } from "../../../q.js";

describe("Q", () => {
    it("should handle then correctly", (done) => {
        const promise = Q(10);
        let thenCalled = false;
        promise.then((value: any) => {
            thenCalled = true;
            expect(value).toBe(10);
            done();
        });
        promise.then(() => {
            expect(thenCalled).toBe(true);
        });
    });
});