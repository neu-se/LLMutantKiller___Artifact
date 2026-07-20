import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should handle nextTick correctly", (done) => {
        let called = false;
        Q.nextTick(() => {
            called = true;
        });
        setTimeout(() => {
            expect(called).toBe(true);
            done();
        }, 10);
    });
});