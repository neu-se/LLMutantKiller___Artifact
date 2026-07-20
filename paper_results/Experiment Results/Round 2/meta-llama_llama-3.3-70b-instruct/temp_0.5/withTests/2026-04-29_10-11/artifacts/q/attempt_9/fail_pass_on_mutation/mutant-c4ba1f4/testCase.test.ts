describe("Q", () => {
    it("should correctly handle setImmediate", (done) => {
        let called = false;
        if (globalThis.setImmediate) {
            globalThis.setImmediate(() => {
                called = true;
            });
            globalThis.setTimeout(() => {
                expect(called).toBe(true);
                done();
            }, 10);
        } else {
            expect(true).toBe(false);
        }
    });
});