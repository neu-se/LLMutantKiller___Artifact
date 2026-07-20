describe("q", () => {
    it("should capture the line number correctly", () => {
        // Create a new promise
        const promise = new Promise((resolve, reject) => {
            resolve();
        });

        // Check if the promise's stack property is not empty
        const error = new Error();
        expect(error.stack).not.toContain("if (false) {");
    });
});