describe("Q.set", () => {
    it("should dispatch 'set' with the correct arguments", () => {
        const object: any = {};
        const key = "testKey";
        const value = "testValue";

        // Use the global Q object
        const Q = (global as any).Q;

        if (Q) {
            Q(object).set(key, value);
            expect(object[key]).toBe(value);
        } else {
            throw new Error("Q is not defined");
        }
    });
});