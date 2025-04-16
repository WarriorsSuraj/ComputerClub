import React from "react";
import ReactDOM from "react-dom/client";

import {javascript} from "@codemirror/lang-javascript"
import { Extension, EditorState } from "@codemirror/state";
import { oneDark } from '@codemirror/theme-one-dark';

import * as ts from 'typescript';
import type { CompletionContext } from "@codemirror/autocomplete";

import {
	EditorView,
	keymap,
	highlightSpecialChars,
	drawSelection,
	highlightActiveLine,
	dropCursor,
	rectangularSelection,
	crosshairCursor,
	lineNumbers,
	highlightActiveLineGutter,
} from "@codemirror/view";
import {
	defaultHighlightStyle,
	syntaxHighlighting,
	indentOnInput,
	bracketMatching,
	foldGutter,
	foldKeymap,
	bracketMatchingHandle,
	HighlightStyle,
} from "@codemirror/language";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import {
	autocompletion,
	completionKeymap,
	closeBrackets,
	closeBracketsKeymap,
	completeAnyWord,
} from "@codemirror/autocomplete";
import { lintKeymap } from "@codemirror/lint";
import {tags} from "@lezer/highlight"

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

function tsCompletionSource(context: CompletionContext) {
	const word = context.matchBefore(/\w*/);
	// biome-ignore lint/suspicious/noDoubleEquals: 
	if (!word || (word.from == word.to && !context.explicit)) return null;
  
	const completions = [
	  { label: "string", type: "type" },
	  { label: "number", type: "type" },
	  { label: "boolean", type: "type" },
	  { label: "null", type: "type" },
	  { label: "undefined", type: "type" },
	  { label: "bigint", type: "type" },
	  { label: "object", type: "type" },
	  { label: "unknown", type: "type" },
	  { label: "any", type: "type" },
	  { label: "never", type: "type" },
	  { label: "void", type: "type" },
	  { label: "[]", type: "type" },
	];
  
	return {
	  from: word.from,
	  options: completions,
	  validFor: /^\w*$/
	};
  }  

const view = new EditorView({
	doc: "Start document",
	parent: document.body,
	extensions: [
	  javascript({ typescript: true }),

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
	  autocompletion({ override: [tsCompletionSource] }),
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
  