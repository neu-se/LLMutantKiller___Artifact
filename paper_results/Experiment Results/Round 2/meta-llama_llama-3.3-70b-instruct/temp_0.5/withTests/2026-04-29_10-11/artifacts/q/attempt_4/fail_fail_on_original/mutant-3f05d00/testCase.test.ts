describe("Q", () => {
    it("should have a finally method on the Promise prototype", () => {
        const promise = Q("foo");
        expect(promise.finally).toBeInstanceOf(Function);
    });
});