describe("Q", () => {
    it("should define properties using Object.defineProperty", () => {
        const obj = {};
        const prop = "test";
        const descriptor = { value: "testValue", configurable: true, writable: true };
        Object.defineProperty(obj, prop, descriptor);
        expect(obj[prop]).toBe("testValue");
        obj[prop] = "newValue";
        expect(obj[prop]).toBe("newValue");
    });
});