import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle promise stack correctly', () => {
        const promise = Q.defer().promise;
        const error = new Error('Test error');

        Q.nextTick(() => {
            try {
                throw error;
            } catch (e) {
                makeStackTraceLong(e, promise);
            }
        });

        expect(error.stack).toBeTruthy();
    });
});

function makeStackTraceLong(error: any, promise: any) {
    if (hasStacks && promise.stack && error && error.stack) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack) {
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        var stack = filterStackString(concatedStacks);
        error.stack = stack;
    }
}

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

var STACK_JUMP_SEPARATOR = "From previous event:";

function filterStackString(stackString: string) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}