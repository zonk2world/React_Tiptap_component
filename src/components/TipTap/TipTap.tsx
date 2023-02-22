import React from "react";
import {getAttributes} from "@tiptap/core";
import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import CustomText from "src/extensions/StampText";
import "./style.css";

const MenuBar = ({editor, slider}) => {
    if (!editor) {
        return null;
    }

    const onStamp = () => {
        editor.chain().focus().setStamp({stamp: slider}).run();
    };

    return (
        <>
            <button onClick={onStamp} className={editor.isActive("bold") ? "is-active" : ""}>
                Stamp
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                className={editor.isActive("heading", {level: 1}) ? "is-active" : ""}
            >
                h1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                className={editor.isActive("heading", {level: 2}) ? "is-active" : ""}
            >
                h2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "is-active" : ""}
            >
                italic
            </button>
        </>
    );
};

const Tiptap = ({slider, onClickStamptext}) => {
    const editor = useEditor({
        extensions: [StarterKit, Paragraph, CustomText],
        content: "<p><span>Hello</span> World ! This is a test ...</p>",
        editorProps: {
            handleClickOn: (view) => {
                const attrs = getAttributes(view.state, "stamptext");
                const stamp = attrs.stamp;
                console.log("handleClickOn", stamp);
                if (stamp) {
                    onClickStamptext(stamp);
                }
            }
        }
    });

    return (
        <div className="tiptap-wrapper">
            <MenuBar editor={editor} slider={slider} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default Tiptap;
