import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of trackRejection function", () => {
        const originalProcessEmit = process.emit;
        const spyProcessEmit = jest.fn();
        process.emit = spyProcessEmit;
        
        // Set process.emit to a non-function value
        process.emit = null;

        // Reject a promise
        q.reject(new Error());

        // Check if spyProcessEmit was not called
        expect(spyProcessEmit).not.toHaveBeenCalled();

        // Restore process.emit
        process.emit = originalProcessEmit;
    });
});