describe("Q promise library", () => {
    it("should create a global Q object when executed as a script", () => {
        // Require the Q library
        const q = require("../../../../../../../../../subject_repositories/q/q.js")();

        // Check if q is defined
        expect(q).toBeDefined();

        // Check if q has a resolve method
        expect(q.resolve).toBeDefined();

        // Create a new promise
        const promise = q.resolve("Test");

        // Wait for the promise to be fulfilled
        return promise.then((value: any) => {
            expect(value).toBe("Test");
        });
    });
});