describe("Promise.prototype.toString", () => {
    it("should return '[object Promise]' when called on a promise", () => {
        const promise = Promise.resolve(10);
        expect(promise.toString()).toContain("[object");
    });
});