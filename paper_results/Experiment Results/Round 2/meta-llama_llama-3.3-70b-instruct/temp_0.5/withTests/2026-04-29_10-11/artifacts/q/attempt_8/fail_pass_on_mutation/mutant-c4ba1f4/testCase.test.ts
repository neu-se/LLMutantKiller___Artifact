describe("Q", () => {
    it("should correctly handle nextTick", (done) => {
        let count = 0;
        globalThis.setImmediate(() => {
            count++;
        });
        globalThis.setImmediate(() => {
            expect(count).toBe(1);
            done();
        });
    });
});