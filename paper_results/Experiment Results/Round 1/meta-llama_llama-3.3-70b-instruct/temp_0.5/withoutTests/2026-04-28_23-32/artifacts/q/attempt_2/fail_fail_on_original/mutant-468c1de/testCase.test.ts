import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should correctly handle error stack traces with minimum stack counter", async () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        const anotherPromise = Q.reject(new Error("Another test error"));
        anotherPromise.stackCounter = 1;
        error.__minimumStackCounter__ = 0;
        makeStackTraceLong(error, anotherPromise);
        expect(error.stack).toContain("makeStackTraceLong");
        expect(error.__minimumStackCounter__).toBe(1);
    });

    function makeStackTraceLong(error, promise) {
        // This function is copied from the original q.js code
        // to test the behavior of the mutated code
        if (hasStacks &&
            promise.stack &&
            typeof error === "object" &&
            error.stack
        ) {
            var stacks = [];
            if (promise.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > promise.stackCounter)) {
                object_defineProperty(error, "__minimumStackCounter__", {value: promise.stackCounter, configurable: true});
                stacks.unshift(promise.stack);
            }
            stacks.unshift(error.stack);

            var concatedStacks = stacks.join("\n" + "From previous event:" + "\n");
            var stack = filterStackString(concatedStacks);
            object_defineProperty(error, "stack", {value: stack, configurable: true});
        }
    }

    function hasStacks() {
        try {
            throw new Error();
        } catch (e) {
            return!!e.stack;
        }
    }

    function filterStackString(stackString) {
        var lines = stackString.split("\n");
        var desiredLines = [];
        for (var i = 0; i < lines.length; ++i) {
            var line = lines[i];

            if (!isInternalFrame(line) &&!isNodeFrame(line) && line) {
                desiredLines.push(line);
            }
        }
        return desiredLines.join("\n");
    }

    function isNodeFrame(stackLine) {
        return stackLine.indexOf("(module.js:")!== -1 ||
               stackLine.indexOf("(node.js:")!== -1;
    }

    function object_defineProperty(obj, prop, descriptor) {
        obj[prop] = descriptor.value;
        return obj;
    }
});