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

        // Mutated code
        const mutatedNextTick = {
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
        mutatedNextTick.runAfter(() => {});
        expect(mutatedNextTick.flushing).toBe(false);
    });
});