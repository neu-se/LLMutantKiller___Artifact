Your task is to write a test for the following function:
```
quill-delta.prototype.invert(base)
```

This function is defined as follows:
```
invert(base) {
        const inverted = new Delta();
        this.reduce((baseIndex, op) => {
            if (op.insert) {
                inverted.delete(Op_1.default.length(op));
            }
            else if (typeof op.retain === 'number' && op.attributes == null) {
                inverted.retain(op.retain);
                return baseIndex + op.retain;
            }
            else if (op.delete || typeof op.retain === 'number') {
                const length = (op.delete || op.retain);
                const slice = base.slice(baseIndex, baseIndex + length);
                slice.forEach((baseOp) => {
                    if (op.delete) {
                        inverted.push(baseOp);
                    }
                    else if (op.retain && op.attributes) {
                        inverted.retain(Op_1.default.length(baseOp), AttributeMap_1.default.invert(op.attributes, baseOp.attributes));
                    }
                });
                return baseIndex + length;
            }
            else if (typeof op.retain === 'object' && op.retain !== null) {
                const slice = base.slice(baseIndex, baseIndex + 1);
                const baseOp = new OpIterator_1.default(slice.ops).next();
                const [embedType, opData, baseOpData] = getEmbedTypeAndData(op.retain, baseOp.insert);
                const handler = Delta.getHandler(embedType);
                inverted.retain({ [embedType]: handler.invert(opData, baseOpData) }, AttributeMap_1.default.invert(op.attributes, baseOp.attributes));
                return baseIndex + 1;
            }
            return baseIndex;
        }, 0);
        return inverted.chop();
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');
describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.