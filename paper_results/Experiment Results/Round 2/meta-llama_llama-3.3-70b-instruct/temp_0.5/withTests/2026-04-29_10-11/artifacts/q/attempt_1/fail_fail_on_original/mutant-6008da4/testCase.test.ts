import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nextTick", () => {
    it("should work correctly when isNodeJS is false", (done) => {
        const originalIsNodeJS = Q.nextTick.isNodeJS;
        Q.nextTick.isNodeJS = false;

        Q.nextTick(() => {
            expect(Q.nextTick.isNodeJS).toBe(false);
            done();
        });

        Q.nextTick.isNodeJS = originalIsNodeJS;
    });

    it("should work correctly when isNodeJS is true", (done) => {
        const originalIsNodeJS = Q.nextTick.isNodeJS;
        Q.nextTick.isNodeJS = true;

        Q.nextTick(() => {
            expect(Q.nextTick.isNodeJS).toBe(true);
            done();
        });

        Q.nextTick.isNodeJS = originalIsNodeJS;
    });
});