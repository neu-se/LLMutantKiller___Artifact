describe("Promise.prototype.toString", () => {
    it("should return a string when called on a promise", () => {
        const promise = Promise.resolve(10);
        expect(typeof promise.toString()).toBe("string");
    });
});