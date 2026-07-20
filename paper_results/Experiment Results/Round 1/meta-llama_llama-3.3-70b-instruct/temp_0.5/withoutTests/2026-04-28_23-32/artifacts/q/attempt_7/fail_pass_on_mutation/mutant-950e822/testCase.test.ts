describe("Promise", () => {
    it("should have a toString method that returns [object Promise]", () => {
        const promise = Promise.resolve();
        expect(promise.toString()).toBe("[object Promise]");
    });
});