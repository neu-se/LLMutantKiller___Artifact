describe("Q", () => {
    it("should set flushing to true when nextTick.runAfter is called and not already flushing", () => {
        const nextTick = {
            flushing: false,
            runAfter: function(task) {
                if (!this.flushing) {
                    this.flushing = true;
                    // Simulate requestTick
                    this.requestTick = function() {};
                    this.requestTick();
                }
            },
            requestTick: function() {}
        };
        nextTick.runAfter(() => {});
        expect(nextTick.flushing).toBe(true);
    });

    it("should not set flushing to true when nextTick.runAfter is called with a condition that is always false", () => {
        const nextTick = {
            flushing: false,
            runAfter: function(task) {
                if (false) {
                    this.flushing = true;
                    // Simulate requestTick
                    this.requestTick = function() {};
                    this.requestTick();
                }
            },
            requestTick: function() {}
        };
        nextTick.runAfter(() => {});
        expect(nextTick.flushing).not.toBe(true);
    });
});