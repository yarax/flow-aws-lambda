# flow-aws-lambda

Type definitions for writing AWS lambda functions. 

Since lambda function interface itself is not a npm library you cannot use Flow npm type definitions (https://github.com/flowtype/flow-typed)

But it's still very usefull and convinient to have types for objects which lambda operates on.
Taken and adopted from TypeScript https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda

# Usage

```
import type {APIGatewayEvent, Context, ProxyCallback} from 'flow-aws-lambda'
```
