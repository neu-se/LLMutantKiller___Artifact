import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nextTick", () => {
    it("should work correctly", (done) => {
        var isNodeJS = Q.nextTick.isNodeJS;
        Q.nextTick.isNodeJS = true;

        Q.nextTick(() => {
            expect(Q.nextTick.isNodeJS).toBe(true);
            Q.nextTick.isNodeJS = isNodeJS;
            done();
        });
    });
});