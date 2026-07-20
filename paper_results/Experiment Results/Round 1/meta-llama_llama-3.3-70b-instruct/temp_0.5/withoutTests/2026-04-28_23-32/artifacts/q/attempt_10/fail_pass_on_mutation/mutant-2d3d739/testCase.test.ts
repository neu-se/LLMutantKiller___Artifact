describe("Q", () => {
    it("should define properties correctly", () => {
        var obj = {};
        var prop = "test";
        var descriptor = {
            value: "testValue",
            configurable: true
        };

        var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
            obj[prop] = descriptor.value;
            return obj;
        };

        expect(typeof object_defineProperty).toBe("function");

        object_defineProperty(obj, prop, descriptor);

        expect(obj[prop]).toBe("testValue");

        try {
            Object.defineProperty = false;
            object_defineProperty({}, 'test', { value: 'testValue' });
        } catch (error) {
            expect(error).toBeInstanceOf(TypeError);
        } finally {
            Object.defineProperty = Object.defineProperty;
        }
    });
});