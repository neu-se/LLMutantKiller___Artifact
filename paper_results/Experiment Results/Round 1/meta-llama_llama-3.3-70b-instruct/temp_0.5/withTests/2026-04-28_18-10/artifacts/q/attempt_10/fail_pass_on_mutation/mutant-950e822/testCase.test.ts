describe("Promise.prototype.toString", () => {
    it("should not be an empty string when called on a promise", () => {
        const promise = Promise.resolve(10);
        expect(promise.toString()).not.toBe("");
    });
});