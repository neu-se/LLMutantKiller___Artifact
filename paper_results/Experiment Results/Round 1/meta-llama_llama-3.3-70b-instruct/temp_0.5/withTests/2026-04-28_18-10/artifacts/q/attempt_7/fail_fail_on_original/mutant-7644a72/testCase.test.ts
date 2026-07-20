describe("QReturnValue", () => {
    it("should throw an error when trying to create a new instance if ReturnValue is not defined and the condition is not met", () => {
        var originalReturnValue = global.ReturnValue;
        delete global.ReturnValue;
        try {
            if (false) {
                var QReturnValue = new global.ReturnValue();
            }
            expect(true).toBe(false);
        } catch (e) {
            expect(e instanceof ReferenceError).toBe(true);
        }
        global.ReturnValue = originalReturnValue;
    });
});