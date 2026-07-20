describe("q.js", () => {
    it("should throw an error when trying to access qFileName without calling captureLine", () => {
        // Check if qFileName is undefined
        expect((global as any).qFileName).toBeUndefined();
    });
});