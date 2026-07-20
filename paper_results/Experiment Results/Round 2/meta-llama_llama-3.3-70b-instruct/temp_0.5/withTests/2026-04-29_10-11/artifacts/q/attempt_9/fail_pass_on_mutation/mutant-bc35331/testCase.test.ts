describe("process check", () => {
    it("should throw an error when process.toString() equals ''", () => {
        if (process.toString() === "") {
            throw new Error("process.toString() should not be an empty string");
        }
        expect(true).toBe(true);
    });
});