describe("Promise", () => {
    it("should have a toString method that is not the default Object.toString", () => {
        const promise = Promise.resolve();
        const object = {};
        expect(promise.toString).not.toBe(object.toString);
    });
});