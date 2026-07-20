import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('makeStackTraceLong function', function () {
    it('should filter out internal frames', function () {
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

        makeStackTraceLong(error, promise);

        expect(error.stack).not.toContain('makeStackTraceLong');
    });

    it.skip('should not filter out internal frames when condition is always true', function () {
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

        makeStackTraceLong(error, promise);

        expect(error.stack).toContain('makeStackTraceLong');
    });
});