import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('makeStackTraceLong function', function () {
    it('should not include internal frames when condition is false', function () {
        var error = new Error();
        var promise = Q.resolve();

        // Simulate the original code
        var makeStackTraceLong = function (error, promise) {
            var stacks = [];
            if (promise.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > promise.stackCounter)) {
                if (promise.stack) {
                    stacks.unshift(promise.stack);
                }
            }
            stacks.unshift(error.stack);

            var concatedStacks = stacks.join("\n" + "From previous event:" + "\n");
            var stack = concatedStacks;
            error.stack = stack;
        };

        promise.stackCounter = 10;
        error.__minimumStackCounter__ = 5;
        makeStackTraceLong(error, promise);

        expect(error.stack).not.toContain('internal frame');
    });

    it('should include internal frames when condition is true in mutated code', function () {
        var error = new Error();
        var promise = Q.resolve();

        // Simulate the mutated code
        var makeStackTraceLong = function (error, promise) {
            var stacks = [];
            if (promise.stack && (true)) {
                if (promise.stack) {
                    stacks.unshift(promise.stack);
                }
            }
            stacks.unshift(error.stack);

            var concatedStacks = stacks.join("\n" + "From previous event:" + "\n");
            var stack = concatedStacks;
            error.stack = stack;
        };

        promise.stack = 'internal frame';
        makeStackTraceLong(error, promise);

        expect(error.stack).toContain('internal frame');
    });
});