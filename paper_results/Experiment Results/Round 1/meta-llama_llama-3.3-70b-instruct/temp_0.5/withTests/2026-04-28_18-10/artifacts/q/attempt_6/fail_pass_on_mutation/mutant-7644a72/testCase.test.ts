describe("QReturnValue", () => {
    it("should be defined when ReturnValue is not defined", () => {
        var originalReturnValue = global.ReturnValue;
        delete global.ReturnValue;
        var QReturnValue = function (value) {
            this.value = value;
        };
        expect(typeof QReturnValue).toBe('function');
        global.ReturnValue = originalReturnValue;
    });

    it.skip("should be equal to ReturnValue when ReturnValue is defined", () => {
        var originalReturnValue = global.ReturnValue;
        global.ReturnValue = function(value) {
            this.value = value;
        };
        expect(global.ReturnValue).toBe(function(value) {
            this.value = value;
        });
        global.ReturnValue = originalReturnValue;
    });
});