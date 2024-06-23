# Typora Parser

## How to use

```shell
$ npm i
```

You get an error like the one below:
```
node_modules/@types/node/globals.d.ts:347:13 - error TS2403: Subsequent variable declarations must have the same type.  Variable 'AbortSignal' must be of type '{ new (): AbortSignal; prototype: AbortSignal; abort(reason?: any): AbortSignal; timeout(milliseconds: number): AbortSignal; }', but here has type '{ new (): AbortSignal; prototype: AbortSignal; }'.

347 declare var AbortSignal: {
                ~~~~~~~~~~~

  node_modules/typescript/lib/lib.dom.d.ts:2071:13
    2071 declare var AbortSignal: {
                     ~~~~~~~~~~~
    'AbortSignal' was also declared here.


Found 1 error in node_modules/@types/node/globals.d.ts:347
```

But don't be afraid, `bin/typoraExport.js` will run correctly. Rather, if you lower the node version, you may get an error.
