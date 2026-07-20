import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle promise stack correctly', () => {
        const promise = Q.defer().promise;
        const error = new Error('Test error');
        const originalStack = error.stack;

        Q.nextTick(() => {
            try {
                throw error;
            } catch (e) {
                makeStackTraceLong(e, promise);
            }
        });

        expect(error.stack).not.toBe(originalStack);
    });
});

function makeStackTraceLong(error: any, promise: any) {
    // This function is copied from the q.js file
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks && promise.stack && typeof error === "object" && error !== null && error.stack) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
                object_defineProperty(error, "__minimumStackCounter__", { value: p.stackCounter, configurable: true });
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        var stack = filterStackString(concatedStacks);
        object_defineProperty(error, "stack", { value: stack, configurable: true });
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

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine: string) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function object_defineProperty(obj: any, prop: string, descriptor: any) {
    obj[prop] = descriptor.value;
    return obj;
}

function isInternalFrame(stackLine: string) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === "q.js" &&
        lineNumber >= 1 &&
        lineNumber <= 1000; // This is a rough estimate, you may need to adjust it
}

function getFileNameAndLineNumber(stackLine: string) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}