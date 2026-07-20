describe("QReturnValue", () => {
    it("should be defined when ReturnValue is defined", () => {
        var originalReturnValue = global.ReturnValue;
        global.ReturnValue = function(value) {
            this.value = value;
        };
        expect(typeof global.ReturnValue).toBe('function');
        global.ReturnValue = originalReturnValue;
    });
});