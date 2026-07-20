describe("Promise", () => {
    it("should have a toString method that returns a string containing 'Promise'", () => {
        const promise = Promise.resolve();
        expect(promise.toString()).toContain("Promise");
    });
});