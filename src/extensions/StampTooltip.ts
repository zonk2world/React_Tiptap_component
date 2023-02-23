import {EditorView} from "@tiptap/pm/view";
import {EditorState} from "@tiptap/pm/state";
import {TooltipHandlerOptions} from "./helpers/stampTooltipHanlder";

export default class StampTooltip {
    tooltip: HTMLDivElement;
    tooltipOptions: TooltipHandlerOptions;

    constructor(view: EditorView, options: TooltipHandlerOptions) {
        this.tooltip = document.createElement("div");
        this.tooltip.className = "tooltip";
        view.dom.parentNode.appendChild(this.tooltip);

        this.tooltipOptions = options;

        const stampButton = document.createElement("button");
        stampButton.innerHTML = "Stamp";
        this.tooltip.appendChild(stampButton);

        // TODO: this is not a right approach
        // we need to find a way to pass an external prop to this plugin
        stampButton.addEventListener("click", () => {
            const stamp = (document.getElementById("stamp") as HTMLInputElement).value;
            const editor = this.tooltipOptions.editor;
            editor.commands.setMark(this.tooltipOptions.type.name, {stamp: parseInt(stamp) / 100});
        });

        this.update(view, null);
    }

    update(view: EditorView, lastState: EditorState) {
        const state = view.state;
        // Don't do anything if the document/selection didn't change
        if (lastState && lastState.doc.eq(state.doc) && lastState.selection.eq(state.selection))
            return;

        // Hide the tooltip if the selection is empty
        if (state.selection.empty) {
            this.tooltip.style.display = "none";
            return;
        }

        // Otherwise, reposition it and update its content
        this.tooltip.style.display = "";
        const {from, to} = state.selection;
        // These are in screen coordinates
        const start = view.coordsAtPos(from),
            end = view.coordsAtPos(to);
        // The box in which the tooltip is positioned, to use as base
        const box = this.tooltip.offsetParent.getBoundingClientRect();
        // Find a center-ish x position from the selection endpoints (when
        // crossing lines, end may be more to the left)
        const left = Math.max((start.left + end.left) / 2, start.left + 3);
        this.tooltip.style.left = left - box.left + "px";
        this.tooltip.style.bottom = box.bottom - start.top + "px";
        // this.tooltip.textContent = (to - from).toString();
    }

    destroy() {
        this.tooltip.remove();
    }
}
