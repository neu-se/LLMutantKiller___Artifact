describe("Q.get function", () => {
    it("should return a promise for the property value of an object", () => {
        const object = { a: 1 };
        const key = "a";
        if (typeof Q.get === 'function') {
            const promise = Q.get(object, key);
            return promise.then((value: any) => {
                expect(value).toBe(1);
            });
        } else {
            throw new Error("Q.get is not implemented");
        }
    });
});