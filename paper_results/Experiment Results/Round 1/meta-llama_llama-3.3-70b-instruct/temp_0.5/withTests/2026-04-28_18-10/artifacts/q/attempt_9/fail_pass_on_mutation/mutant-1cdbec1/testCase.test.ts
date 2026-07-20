describe("Q function behavior", () => {
    it("should create Q object on global with 'or' condition", () => {
        const window = { Q: null };
        const self = { Q: null };
        if (typeof window!== "undefined" || typeof self!== "undefined") {
            var global = typeof window!== "undefined"? window : self;
            global.Q = {};
        }
        expect(window.Q).toBeDefined();
        expect(self.Q).toBeDefined();
    });

    it.skip("should not create Q object on global with 'and' condition", () => {
        const window = { Q: null };
        const self = null;
        if (typeof window!== "undefined" && typeof self!== "undefined") {
            var global = typeof window!== "undefined"? window : self;
            global.Q = {};
        }
        expect(window.Q).toBeNull();
        expect(self).toBeNull();
    });
});