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
            expect(called).toBe(true);
        });
        globalThis.setImmediate(() => {
            expect(called).toBe(true);
        });
        globalThis.setImmediate(() => {
            expect(called).toBe(true);
        });
        globalThis.setImmediate(() => {
            expect(called).toBe(true);
        });
        globalThis.setImmediate(() => {
            expect(called).toBe(true);
        });
        globalThis.setImmediate(() => {
            expect(called).toBe(true);
        });
        globalThis.setImmediate(() => {
            expect(called).toBe(true);
        });
        globalThis.setImmediate(() => {
            expect(called).toBe(true);
        });
        globalThis.setImmediate(() => {
            expect(called).toBe(true);
        });
        globalThis.setImmediate(() => {
            expect(called).toBe(true);
        });
        if (globalThis.setImmediate) {
            globalThis.setImmediate(() => {
                expect(called).toBe(true);
            });
        } else {
            expect(true).toBe(false);
        }
        globalThis.setTimeout(() => {
            expect(called).toBe(true);
        }, 10);
    });
});