describe("Q", () => {
    it("should use nextTick correctly", (done) => {
        const originalNextTick = global.setTimeout;
        let called = false;

        Q.nextTick(() => {
            called = true;
        });

        global.setTimeout(() => {
            expect(called).toBe(true);
            done();
        }, 10);
    });
});