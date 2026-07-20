describe("Q", () => {
    it("should define properties correctly", () => {
        var obj = {};
        var prop = "test";
        var descriptor = {
            value: "testValue",
            configurable: true
        };

        var object_defineProperty = Object.defineProperty;

        if (typeof object_defineProperty === 'function') {
            object_defineProperty(obj, prop, descriptor);
            expect(obj[prop]).toBe("testValue");
        } else {
            expect.fail("object_defineProperty is not a function");
        }
    });
});