// Test case to detect the mutation in q.js
import { Q } from "./q.js";

describe("QReturnValue mutation test", () => {
    it("should correctly handle Q.return in non-ES6 generator environments", () => {
        // This test verifies that Q.return() works as expected in environments
        // where ES6 generators are not natively supported (like older SpiderMonkey)
        // The mutation changes the condition from checking typeof ReturnValue
        // to always being false, which would break this functionality

        // Create a generator-like function that uses Q.return
        const testGenerator = Q.async(function* () {
            yield Q.delay(10);
            return "success";
        });

        // Also test the explicit Q.return usage
        const testGeneratorWithReturn = Q.async(function () {
            Q.delay(10).then(function () {
                Q["return"]("explicit success");
            });
        });

        // Both should resolve successfully
        return Promise.all([
            testGenerator().then(result => {
                expect(result).toBe("success");
            }),
            testGeneratorWithReturn().catch(e => {
                // In the mutated version, this would throw QReturnValue is not defined
                // In the original version, it should handle it gracefully
                expect(e).toBeUndefined();
            })
        ]);
    });
});