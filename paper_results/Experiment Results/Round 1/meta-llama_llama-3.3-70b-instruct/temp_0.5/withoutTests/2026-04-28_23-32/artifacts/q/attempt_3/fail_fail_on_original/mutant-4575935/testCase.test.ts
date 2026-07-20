describe("Q promise library", () => {
    it("should create a global Q object when executed as a script", () => {
        // Check if Q is defined
        const q = require("../../../../../../../../../subject_repositories/q/q.js");
        expect(q).toBeDefined();

        // Create a new promise
        const promise = q("Test");

        // Check if the promise is fulfilled
        promise.then((value: any) => {
            expect(value).toBe("Test");
        });
    });
});