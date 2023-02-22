import {Mark, mergeAttributes} from "@tiptap/core";
import {Plugin} from "@tiptap/pm/state";
import {clickHandler} from "./helpers/stampClickHanlder";

export interface StampOptions {
    HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        stamptext: {
            setStamp: (attributes: {stamp: string}) => ReturnType;
            toggleStamp: () => ReturnType;
        };
    }
}

const StampText = Mark.create<StampOptions>({
    name: "stamptext",
    group: "group",
    selectable: true,
    atom: true,
    parseHTML() {
        return [
            {
                tag: "span[data-type='stamp']"
            }
        ];
    },
    addAttributes() {
        return {
            stamp: {
                default: null
            }
        };
    },
    renderHTML({HTMLAttributes}) {
        return ["span", mergeAttributes({...HTMLAttributes, style: "background-color: #eee;"})];
    },
    addCommands() {
        return {
            setStamp:
                (attributes) =>
                ({chain}) => {
                    return chain().setMark(this.name, attributes).run();
                },
            toggleStamp:
                () =>
                ({commands}) => {
                    return commands.toggleMark(this.name);
                }
        };
    },
    addProseMirrorPlugins() {
        const plugins: Plugin[] = [];

        plugins.push(
            clickHandler({
                type: this.type
            })
        );

        return plugins;
    }
});

export default StampText;
