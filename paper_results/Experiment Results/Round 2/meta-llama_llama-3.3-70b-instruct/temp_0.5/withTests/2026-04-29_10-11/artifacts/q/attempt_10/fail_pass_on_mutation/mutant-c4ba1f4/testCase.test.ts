describe("Q", () => {
    it("should correctly handle setImmediate", (done) => {
        let count = 0;
        if (globalThis.setImmediate) {
            globalThis.setImmediate(() => {
                count++;
            });
            globalThis.setImmediate(() => {
                count++;
            });
            globalThis.setTimeout(() => {
                expect(count).toBe(2);
                done();
            }, 10);
        } else {
            expect(true).toBe(false);
        }
    });
});