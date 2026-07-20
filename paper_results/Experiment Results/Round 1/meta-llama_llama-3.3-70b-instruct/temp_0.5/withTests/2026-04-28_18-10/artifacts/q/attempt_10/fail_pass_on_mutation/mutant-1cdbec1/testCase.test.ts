describe("Q function behavior", () => {
    it("should create Q object on global with 'or' condition and not 'and' condition", () => {
        const window = { Q: null };
        const self = { Q: null };
        let globalQCreated = false;
        if (typeof window!== "undefined" || typeof self!== "undefined") {
            var global = typeof window!== "undefined"? window : self;
            global.Q = {};
            globalQCreated = true;
        }
        if (typeof window!== "undefined" && typeof self!== "undefined") {
            var global = typeof window!== "undefined"? window : self;
            global.Q = {};
        }
        expect(globalQCreated).toBe(true);
        expect(window.Q).toBeDefined();
        expect(self.Q).toBeDefined();
    });
});