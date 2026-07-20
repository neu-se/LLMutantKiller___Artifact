describe("Q", () => {
    it("should dispatch delete correctly", async () => {
        const obj = { foo: "bar", delete: () => { throw new Error("delete should not be called directly"); } };
        const promise = Q(obj);
        const result = promise["delete"]("foo");
        await expect(result).resolves.not.toThrow();
    });
});