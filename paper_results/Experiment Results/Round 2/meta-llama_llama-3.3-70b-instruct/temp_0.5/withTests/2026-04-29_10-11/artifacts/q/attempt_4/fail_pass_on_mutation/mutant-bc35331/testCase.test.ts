describe("process.toString() check", () => {
    it("should correctly check process.toString()", () => {
        if (typeof process !== "undefined" && process !== null && process.toString === "[object process]") {
            throw new Error("process.toString() should not be '[object process]'");
        }
    });
});