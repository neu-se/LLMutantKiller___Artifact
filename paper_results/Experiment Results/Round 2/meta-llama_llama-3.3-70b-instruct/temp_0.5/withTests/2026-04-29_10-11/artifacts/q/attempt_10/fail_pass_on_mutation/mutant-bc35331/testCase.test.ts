describe("process check", () => {
    it("should pass when process.toString() equals '[object process}'", () => {
        if (typeof process !== "undefined") {
            expect(process.toString()).toBe("[object process]");
        } else {
            expect(true).toBe(true);
        }
    });
});