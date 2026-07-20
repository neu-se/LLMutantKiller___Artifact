import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when finally callback is a function in original code but throw an error in mutated code", () => {
        var callback = function() {};
        var originalCode = Q().finally(callback);
        expect(originalCode).not.toThrowError();

        // Simulating mutated code behavior
        var mutatedCode = Q().finally(function() {});
        expect(mutatedCode).not.toThrowError();
    });
});