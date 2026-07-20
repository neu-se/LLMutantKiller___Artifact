"use strict";

const DeltaModule = require('../../subject_repositories/delta/dist/Delta.js');

const OriginalDelta = DeltaModule.default;
const AttributeMap = DeltaModule.AttributeMap;
const Op = DeltaModule.Op;
const OpIterator = DeltaModule.OpIterator;

class MutatedDelta extends OriginalDelta {
  transform(arg, priority = false) {
    priority = !!priority;
    if (typeof arg === 'number') {
      return this.transformPosition(arg, priority);
    }

    const other = arg;
    const thisIter = new OpIterator(this.ops);
    const otherIter = new OpIterator(other.ops);
    const delta = new MutatedDelta();

    while (thisIter.hasNext() || otherIter.hasNext()) {
      if (
        thisIter.peekType() === 'insert' &&
        (priority || otherIter.peekType() !== 'insert')
      ) {
        delta.retain(Op.length(thisIter.next()));
      } else if (otherIter.peekType() === 'insert') {
        delta.push(otherIter.next());
      } else {
        const length = Math.min(thisIter.peekLength(), otherIter.peekLength());
        const thisOp = thisIter.next(length);
        const otherOp = otherIter.next(length);

        if (thisOp.delete) {
          continue;
        } else if (otherOp.delete) {
          delta.push(otherOp);
        } else {
          const thisData = thisOp.retain;
          const otherData = otherOp.retain;
          let transformedData =
            typeof otherData === 'object' && otherData !== null
              ? otherData
              : length;

          if (
            typeof thisData === 'object' ||
            (thisData !== null &&
              typeof otherData === 'object' &&
              otherData !== null)
          ) {
            const embedType = Object.keys(thisData)[0];
            if (embedType === Object.keys(otherData)[0]) {
              const handler = MutatedDelta.getHandler(embedType);
              if (handler) {
                transformedData = {
                  [embedType]: handler.transform(
                    thisData[embedType],
                    otherData[embedType],
                    priority,
                  ),
                };
              }
            }
          }

          delta.retain(
            transformedData,
            AttributeMap.transform(
              thisOp.attributes,
              otherOp.attributes,
              priority,
            ),
          );
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
