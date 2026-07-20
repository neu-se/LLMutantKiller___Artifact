describe("process check", () => {
    it("should pass when process.toString() does not equal ''", () => {
        expect(process.toString()).not.toBe("");
    });
});