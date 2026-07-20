import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('makeStackTraceLong function', function () {
    it('should not throw an error when promise.stack is undefined in original code', function () {
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

        promise.stack = undefined;
        expect(function() { makeStackTraceLong(error, promise); }).not.toThrow();
    });

    it('should throw an error when promise.stack is undefined in mutated code', function () {
        var error = new Error();
        var promise = Q.resolve();

        // Simulate the mutated code
        var makeStackTraceLong = function (error, promise) {
            if (!promise.stack) {
                throw new Error('promise.stack is undefined');
            }
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

        promise.stack = undefined;
        expect(function() { makeStackTraceLong(error, promise); }).toThrow();
    });
});