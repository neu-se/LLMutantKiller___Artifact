describe("Q", () => {
    it("should define QReturnValue when ReturnValue is defined", () => {
        var originalReturnValue = global.ReturnValue;
        global.ReturnValue = function(value) {
            this.value = value;
        };
        expect(Q.QReturnValue).toBe(global.ReturnValue);
        global.ReturnValue = originalReturnValue;
    });
});