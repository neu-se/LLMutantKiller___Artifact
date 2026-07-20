describe("process check", () => {
    it("should pass when process.toString() equals '[object process]'", () => {
        if (typeof process !== "undefined" && process.toString() === "[object process]") {
            expect(true).toBe(true);
        } else {
            expect(false).toBe(true);
        }
    });
});