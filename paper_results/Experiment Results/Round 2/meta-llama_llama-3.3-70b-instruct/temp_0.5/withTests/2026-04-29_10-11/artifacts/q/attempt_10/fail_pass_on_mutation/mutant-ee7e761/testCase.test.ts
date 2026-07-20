describe("Promise", () => {
    it("should have a 'del' method", () => {
        const obj = { a: 1, b: 2 };
        expect(() => {
            (obj as any).del("a");
        }).toThrowError();
    });
});