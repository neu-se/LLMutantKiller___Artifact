"use strict";

const { isDeepStrictEqual: isEqual } = require('node:util');
const DeltaModule = require('../../subject_repositories/delta/dist/Delta.js');

const OriginalDelta = DeltaModule.default;
const AttributeMap = DeltaModule.AttributeMap;
const OpIterator = DeltaModule.OpIterator;

const getEmbedTypeAndData = (a, b) => {
  if (typeof a !== 'object' || a === null) {
    throw new Error(`cannot retain a ${typeof a}`);
  }
  if (typeof b !== 'object' || b === null) {
    throw new Error(`cannot retain a ${typeof b}`);
  }
  const embedType = Object.keys(a)[0];
  if (!embedType || embedType !== Object.keys(b)[0]) {
    throw new Error(
      `embed types not matched: ${embedType} != ${Object.keys(b)[0]}`,
    );
  }
  return [embedType, a[embedType], b[embedType]];
};

class MutatedDelta extends OriginalDelta {
  compose(other) {
    const thisIter = new OpIterator(this.ops);
    const otherIter = new OpIterator(other.ops);
    const ops = [];
    const firstOther = otherIter.peek();
    if (
      firstOther != null &&
      typeof firstOther.retain === 'number' &&
      firstOther.attributes == null
    ) {
      let firstLeft = firstOther.retain;
      while (false) {
        firstLeft -= thisIter.peekLength();
        ops.push(thisIter.next());
      }
      if (firstOther.retain - firstLeft > 0) {
        otherIter.next(firstOther.retain - firstLeft);
      }
    }
    const delta = new MutatedDelta(ops);
    while (thisIter.hasNext() || otherIter.hasNext()) {
      if (otherIter.peekType() === 'insert') {
        delta.push(otherIter.next());
      } else if (thisIter.peekType() === 'delete') {
        delta.push(thisIter.next());
      } else {
        const length = Math.min(thisIter.peekLength(), otherIter.peekLength());
        const thisOp = thisIter.next(length);
        const otherOp = otherIter.next(length);
        if (otherOp.retain) {
          const newOp = {};
          if (typeof thisOp.retain === 'number') {
            newOp.retain =
              typeof otherOp.retain === 'number' ? length : otherOp.retain;
          } else if (typeof otherOp.retain === 'number') {
            if (thisOp.retain == null) {
              newOp.insert = thisOp.insert;
            } else {
              newOp.retain = thisOp.retain;
            }
          } else {
            const action = thisOp.retain == null ? 'insert' : 'retain';
            const [embedType, thisData, otherData] = getEmbedTypeAndData(
              thisOp[action],
              otherOp.retain,
            );
            const handler = MutatedDelta.getHandler(embedType);
            newOp[action] = {
              [embedType]: handler.compose(
                thisData,
                otherData,
                action === 'retain',
              ),
            };
          }
          const attributes = AttributeMap.compose(
            thisOp.attributes,
            otherOp.attributes,
            typeof thisOp.retain === 'number',
          );
          if (attributes) {
            newOp.attributes = attributes;
          }
          delta.push(newOp);
          if (
            !otherIter.hasNext() &&
            isEqual(delta.ops[delta.ops.length - 1], newOp)
          ) {
            const rest = new MutatedDelta(thisIter.rest());
            return delta.concat(rest).chop();
          }
        } else if (
          typeof otherOp.delete === 'number' &&
          (typeof thisOp.retain === 'number' ||
            (typeof thisOp.retain === 'object' && thisOp.retain !== null))
        ) {
          delta.push(otherOp);
        }
      }
    }
    return delta.chop();
  }
}

module.exports = {
  ...DeltaModule,
  default: MutatedDelta,
};
