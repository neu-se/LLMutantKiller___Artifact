describe("Q.set", () => {
    it("should dispatch 'set' with the correct arguments", () => {
        const object: any = {};
        const key = "testKey";
        const value = "testValue";

        // Use the global Q object
        (global as any).Q.set(object, key, value);

        expect(object[key]).toBe(value);
    });
});