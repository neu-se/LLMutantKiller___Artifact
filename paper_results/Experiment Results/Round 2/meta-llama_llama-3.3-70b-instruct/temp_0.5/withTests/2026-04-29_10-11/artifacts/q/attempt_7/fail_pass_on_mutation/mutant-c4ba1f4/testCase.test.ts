describe("Q", () => {
    it("should correctly handle nextTick", (done) => {
        let called = false;
        globalThis.setTimeout(() => {
            called = true;
            expect(called).toBe(true);
            done();
        }, 0);
        expect(called).toBe(false);
        globalThis.setImmediate(() => {
            expect(called).toBe(false);
        });
    });
});