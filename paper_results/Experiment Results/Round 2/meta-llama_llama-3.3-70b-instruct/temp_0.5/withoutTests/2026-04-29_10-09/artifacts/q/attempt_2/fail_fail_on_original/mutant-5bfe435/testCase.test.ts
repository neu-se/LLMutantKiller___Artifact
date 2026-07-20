import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should resolve a promise when process.nextTick is available", (done) => {
        const originalNextTick = process.nextTick;
        process.nextTick = () => {};
        const promise = Q.resolve("test");
        promise.then((value) => {
            expect(value).toBe("test");
            process.nextTick = originalNextTick;
            done();
        });
    });
});