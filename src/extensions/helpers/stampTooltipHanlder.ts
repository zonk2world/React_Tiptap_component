import {Editor} from "@tiptap/core";
import {MarkType} from "@tiptap/pm/model";
import {Plugin} from "@tiptap/pm/state";
import StampTooltip from "../StampTooltip";

export type TooltipHandlerOptions = {
    type: MarkType;
    editor: Editor;
};

export function tooltipHandler(options: TooltipHandlerOptions): Plugin {
    return new Plugin({
        view(editorView) {
            return new StampTooltip(editorView, options);
        }
    });
}
