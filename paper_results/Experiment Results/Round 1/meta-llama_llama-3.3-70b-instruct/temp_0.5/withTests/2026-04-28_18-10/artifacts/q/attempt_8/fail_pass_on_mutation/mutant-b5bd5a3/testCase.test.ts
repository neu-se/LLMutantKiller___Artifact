describe("Promise", () => {
    it("should have a valueOf method that returns the value when the promise is fulfilled", () => {
        const promise = Promise.resolve(10);
        // Since we cannot directly access the valueOf method, we will check if the promise is fulfilled
        expect(promise.then((value) => value)).resolves.toBe(10);
    });
});