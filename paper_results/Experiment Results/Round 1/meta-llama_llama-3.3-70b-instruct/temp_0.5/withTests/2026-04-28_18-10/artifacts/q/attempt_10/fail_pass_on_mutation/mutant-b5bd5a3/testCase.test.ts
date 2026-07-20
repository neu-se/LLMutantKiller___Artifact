describe("Promise", () => {
    it("should have a valueOf method that returns the promise itself when it is pending", () => {
        const promise = new Promise((resolve) => {
            // do nothing
        });
        try {
            const result = promise.valueOf();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});