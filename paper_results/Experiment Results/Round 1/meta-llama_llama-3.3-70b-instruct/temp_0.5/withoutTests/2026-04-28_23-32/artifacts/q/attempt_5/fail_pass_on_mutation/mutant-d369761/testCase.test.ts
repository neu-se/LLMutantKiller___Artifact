describe("Q tests", () => {
    it("should return object keys", async () => {
        const obj = { a: 1, b: 2, c: 3 };
        const keys = Object.keys(obj);
        expect(keys).toEqual(["a", "b", "c"]);
    });
});