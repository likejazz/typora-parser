#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json_1 = require("../package.json");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const src_1 = __importDefault(require("../src"));
const MathJaxRenderer_1 = __importDefault(require("../src/plugins/MathJaxRenderer"));
const HighlightJsRenderer_1 = __importDefault(require("../src/plugins/HighlightJsRenderer"));
new commander_1.Command()
    .version(package_json_1.version)
    .name('typora-export')
    .argument('<file>', 'input markdown filename')
    .requiredOption('-o, --output <file>', 'output file name')
    .option('-n, --vanilla-html', 'no typora-specific classes, corresponds to typora "export HTML (without styles)"')
    .option('-e, --exclude-head', 'don\'t include head and body tag')
    .option('-t, --title <title>', 'title of the html page, no effect when --exclude-head, defaults to file name without extension')
    .option('-g, --extra-head-tags <file>', 'extra tags add to the head tag, no effect when --exclude-head')
    .option('-l, --code-display-line-numbers', 'display line numbers on code block, no effect when --vanilla-html')
    .option('-b, --math-auto-numbering', 'auto numbering math blocks')
    .option('-k, --math-dont-apply-line-breaks', 'don\'t apply line breaks at \\\\ and \\newline in math block, see https://support.typora.io/Math/#line-breaking')
    .action((inputFileName, options) => __awaiter(void 0, void 0, void 0, function* () {
    const parseResult = src_1.default.parse(yield promises_1.default.readFile(inputFileName, { encoding: 'utf8' }));
    const html = parseResult.renderHTML({
        vanillaHTML: options.vanillaHtml === true,
        includeHead: options.excludeHead !== true,
        title: options.title === undefined ? path_1.default.parse(inputFileName).name : options.title,
        extraHeadTags: options.extraHeadTags ? yield promises_1.default.readFile(options.extraHeadTags, { encoding: 'utf8' }) : null,
        latexRenderer: new MathJaxRenderer_1.default({
            autoNumbering: options.mathAutoNumbering === true,
            applyLineBreaks: options.mathDontApplyLineBreaks !== true,
        }),
        codeRenderer: new HighlightJsRenderer_1.default({
            displayLineNumbers: options.codeDisplayLineNumbers === true,
        }),
    });
    yield promises_1.default.writeFile(options.output, html);
}))
    .parse();
//# sourceMappingURL=typoraExport.js.map