import React from "react";
import ReactDOM from "react-dom/client";
import {rust} from "@codemirror/lang-rust"
import { Extension, EditorState } from "@codemirror/state";
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, keymap, lineNumbers, highlightSpecialChars, drawSelection, 
         dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine,
         highlightActiveLineGutter } from "@codemirror/view"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import { foldGutter, indentOnInput, syntaxHighlighting, bracketMatching,
         foldKeymap, HighlightStyle } from "@codemirror/language"
import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete"
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search"
import { autocompletion, completionKeymap } from "@codemirror/autocomplete"
import { lintKeymap } from "@codemirror/lint"
import {tags} from "@lezer/highlight"
import type { CompletionContext } from "@codemirror/autocomplete";

const customewordhighlighting = HighlightStyle.define([
    {
        tag: tags.keyword, color: "#963bf1",
    },
    {
        tag: tags.variableName, color: "#d7d4d9",
    },
    {
        tag: tags.blockComment, color: "#808080",
    },
    {
        tag: tags.bool, color: "#4197e6"
    }
]);

function rustCompletionSource(context: CompletionContext) {
    const word = context.matchBefore(/\w*/);
    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if (!word || (word.from == word.to && !context.explicit)) return null;
  
    const completions = [
      { label: "i32", type: "type" },
      { label: "i64", type: "type" },
      { label: "u32", type: "type" },
      { label: "u64", type: "type" },
      { label: "f32", type: "type" },
      { label: "f64", type: "type" },
      { label: "bool", type: "type" },
      { label: "char", type: "type" },
      { label: "str", type: "type" },
      { label: "String", type: "type" },
      { label: "Vec", type: "type" },
      { label: "Option", type: "type" },
      { label: "Result", type: "type" },
      { label: "fn", type: "keyword" },
      { label: "let", type: "keyword" },
      { label: "mut", type: "keyword" },
      { label: "struct", type: "keyword" },
      { label: "enum", type: "keyword" },
      { label: "impl", type: "keyword" },
      { label: "trait", type: "keyword" },
    ];
  
    return {
      from: word.from,
      options: completions,
      validFor: /^\w*$/
    };
}  

const view = new EditorView({
    doc: "// Your Rust code here",
    parent: document.body,
    extensions: [
      rust(),
      lineNumbers(),
      foldGutter(),
      highlightSpecialChars(),
      history(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      syntaxHighlighting(customewordhighlighting),
      bracketMatching(),
      closeBrackets(),
      autocompletion({ override: [rustCompletionSource] }),
      rectangularSelection(),
      crosshairCursor(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      highlightSelectionMatches(),

      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        ...lintKeymap,
      ]),

      oneDark,
    ],
});
