import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q promise library", () => {
    it("should correctly handle promise chaining with long stack traces", () => {
        const promise = Q.defer().promise;
        const chainedPromise = promise.then(() => {
            throw new Error("Test error");
        });
        expect(chainedPromise.isPending()).toBe(true);
        Q.defer().resolve().then(() => {
            promise.resolve();
        });
        return chainedPromise.catch((error) => {
            expect(error.stack).toContain("Test error");
        });
    });
});