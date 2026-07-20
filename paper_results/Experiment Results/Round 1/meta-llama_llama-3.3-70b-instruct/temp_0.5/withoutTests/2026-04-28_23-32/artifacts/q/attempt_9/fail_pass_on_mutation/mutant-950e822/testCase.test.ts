describe("Promise", () => {
    it("should have a toString method that returns '[object Promise]' when called directly", () => {
        const promise = Promise.resolve();
        expect(Object.prototype.toString.call(promise)).toBe("[object Promise]");
    });
});