import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of trackRejection function", () => {
        const originalProcessEmit = process.emit;
        const spyProcessEmit = jest.fn();
        process.emit = spyProcessEmit;
        
        // Reject a promise
        q.reject(new Error());

        // Check if spyProcessEmit was called with the correct condition
        expect(spyProcessEmit.mock.calls[0][0]).toBe('unhandledRejection');
        expect(typeof process.emit === "function").toBe(true);

        // Restore process.emit
        process.emit = originalProcessEmit;
    });
});