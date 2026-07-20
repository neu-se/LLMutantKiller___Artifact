describe("Q promise library", () => {
    it("should create a global Q object when executed as a script", () => {
        // Require the Q library
        const Q = require("../../../../../../../../../subject_repositories/q/q.js");

        // Check if Q is defined
        expect(Q).toBeDefined();

        // Check if Q has a resolve method
        expect(Q.resolve).toBeDefined();

        // Create a new promise
        const promise = Q.resolve("Test");

        // Check if the promise is fulfilled
        promise.then((value: any) => {
            expect(value).toBe("Test");
        });
    });
});