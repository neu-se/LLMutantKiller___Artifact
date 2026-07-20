describe("process check", () => {
    it("should pass when process.toString() is not empty", () => {
        if (typeof process !== "undefined" && process.toString() !== "") {
            expect(true).toBe(true);
        } else {
            expect(false).toBe(true);
        }
    });
});