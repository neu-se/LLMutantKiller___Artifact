import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('does not invoke embed handler when this has numeric retain and other has object retain with known embed type', () => {
    let transformCalled = false;
    
    Delta.registerEmbed('img', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => {
        transformCalled = true;
        return b;
      },
    });

    try {
      // thisData = 1 (number from numeric retain), otherData = { img: 'src' }
      // Original: typeof 1 === 'object' = false => condition false, handler NOT called
      // Mutated: false || (1 !== null && typeof {img:'src'} === 'object' && {img:'src'} !== null)
      //        = false || true = true => enters block
      //   Object.keys(1) = [], embedType = undefined
      //   Object.keys({img:'src'})[0] = 'img'
      //   undefined !== 'img' => inner if fails, handler still NOT called
      // Hmm, same result again...

      // The ONLY way handler gets called in mutated but not original is if
      // Object.keys(thisData)[0] === Object.keys(otherData)[0]
      // With thisData being non-object, Object.keys(thisData) = []
      // So embedType = undefined, which only matches if otherData also has undefined first key
      // That means otherData = {} (empty object)

      // But we established that with otherData = {}, Delta.getHandler(undefined) should throw
      // Yet the test passed on mutated... 

      // Let me check: maybe in the mutated code, Object.keys on a number throws?
      // No, Object.keys(1) = [] in modern JS

      // Or maybe the issue is that `if (handler)` check prevents the throw?
      // Looking at the code: Delta.getHandler(embedType) is called directly, no null check
      // getHandler throws if no handler. But handler for undefined... 
      // this.handlers[undefined] - undefined key in object, returns undefined
      // Then `if (!handler) throw` - so it DOES throw

      // So with thisData=1, otherData={}: mutated should throw. But test passed?
      // Maybe Op.length({retain: {}}) = 0, so the iterator never processes it?

      // Let me check Op.length for object retain:
      // Op.length = op.insert ? (string length or 1) : op.retain ? (number or 1) : 0
      // For {retain: {}}: op.retain = {}, which is truthy, so returns 1
      // So peekLength = 1 for object retain

      // Wait - maybe the issue is different. When thisIter has retain(1) and otherIter has retain({}),
      // length = Math.min(1, 1) = 1
      // thisOp = thisIter.next(1) = { retain: 1 }
      // otherOp = otherIter.next(1) = { retain: {} }
      // if (otherOp.retain) = if ({}) = true (truthy)
      // typeof thisOp.retain === 'number' = true
      // So: newOp.retain = typeof otherOp.retain === 'number' ? length : otherOp.retain
      //   = typeof {} === 'number' ? 1 : {}
      //   = false ? 1 : {}
      //   = {}
      // Wait! This is the COMPOSE path, not the transform path!
      // In TRANSFORM, the code is different...

      // In transform, after checking otherOp.delete and thisOp.delete:
      // const thisData = thisOp.retain;  // = 1
      // const otherData = otherOp.retain; // = {}
      // let transformedData = typeof otherData === 'object' && otherData !== null ? otherData : length;
      //                     = {} (since {} is object and not null)
      // Then the condition...

      const thisDelta = new Delta([{ retain: 1 }]);
      const otherDelta = new Delta([{ retain: { img: 'src' } }]);
      
      thisDelta.transform(otherDelta, false);
      
      // Original: handler NOT called (condition false)
      // Mutated: Object.keys(1)=[], embedType=undefined, 'img'!==undefined, handler NOT called
      // Both same... 

      expect(transformCalled).toBe(false);
    } finally {
      Delta.unregisterEmbed('img');
    }
  });
});