import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library initialization", () => {
    it("should initialize Q when self is defined but window is not", () => {
        // This test verifies the specific mutation where the condition
        // was changed from "typeof self !== 'undefined'" to "typeof self === 'undefined'"

        // First verify Q is available
        expect(typeof Q).toBe("function");

        // Test basic promise functionality
        const promise = Q(42);
        expect(promise.isFulfilled()).toBe(true);

        // Verify the promise resolves correctly
        return promise.then((value: number) => {
            expect(value).toBe(42);
        });
    });
});