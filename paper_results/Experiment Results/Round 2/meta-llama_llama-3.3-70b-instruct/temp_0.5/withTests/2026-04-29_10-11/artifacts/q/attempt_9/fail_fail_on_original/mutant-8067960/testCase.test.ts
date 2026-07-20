describe("Q", () => {
    it("should have a get method that returns a promise for the property value of an object", () => {
        const object = { a: 1 };
        const key = "a";
        if (typeof Q === 'object' && typeof Q.get === 'function') {
            const promise = Q.get(object, key);
            return promise.then((value: any) => {
                expect(value).toBe(1);
            });
        } else {
            throw new Error("Q or Q.get is not defined");
        }
    });
});