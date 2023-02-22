import {getAttributes} from "@tiptap/core";
import {MarkType} from "@tiptap/pm/model";
import {Plugin, PluginKey} from "@tiptap/pm/state";

type ClickHandlerOptions = {
    type: MarkType;
};

export function clickHandler(options: ClickHandlerOptions): Plugin {
    return new Plugin({
        key: new PluginKey("handleClickStamp"),
        props: {
            handleClick: (view) => {
                const attrs = getAttributes(view.state, options.type.name);

                const stamp = attrs.stamp;

                return stamp;
            }
        }
    });
}
