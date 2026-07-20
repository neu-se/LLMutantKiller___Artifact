import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise Library", () => {
    it("should resolve the promise after the specified timeout", () => {
        const promise = Q(10).timeout(50);
        return promise.then((value) => {
            expect(value).toBe(10);
        });
    });

    it("should reject the promise if the timeout is exceeded", () => {
        const promise = Q.delay(100).timeout(50);
        return promise.then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.code).toBe("ETIMEDOUT");
        });
    });

    it("should clear the timeout if the promise is resolved before the timeout", () => {
        const promise = Q.delay(20).timeout(50);
        return promise.then((value) => {
            expect(value).toBeUndefined();
        });
    });
});