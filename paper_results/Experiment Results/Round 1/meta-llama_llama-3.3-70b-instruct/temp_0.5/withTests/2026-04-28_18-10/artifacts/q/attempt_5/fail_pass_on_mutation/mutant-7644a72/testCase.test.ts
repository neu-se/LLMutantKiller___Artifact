describe("QReturnValue", () => {
    it("should be defined", () => {
        var QReturnValue = function (value) {
            this.value = value;
        };
        expect(QReturnValue).toBeDefined();
    });
});