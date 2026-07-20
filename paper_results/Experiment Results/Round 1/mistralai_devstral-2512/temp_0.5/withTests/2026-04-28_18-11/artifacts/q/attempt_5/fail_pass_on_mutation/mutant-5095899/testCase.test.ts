describe("Q library initialization in browser environment", () => {
    it("should initialize Q when self is defined but window is not", () => {
        // Load Q by requiring it (this will execute the initialization code)
        const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

        // Verify Q was initialized correctly
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