import React, {useEffect} from "react";
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
        <div className="tiptap__button-wrapper">
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
        </div>
    );
};

const Tiptap = ({slider, onClickStamptext}) => {
    const editor = useEditor({
        extensions: [StarterKit, Paragraph, CustomText],
        content:
            "<h1>Hello World !</h1><h2>This is a test.</h2><p>Lorem ipsum dolor sit amet...</p>",
        editorProps: {
            handleClickOn: (view) => {
                const attrs = getAttributes(view.state, "stamptext");
                const stamp = attrs.stamp;
                if (stamp) {
                    onClickStamptext(stamp);
                }
            }
        }
    });

    useEffect(() => {
        const scrollWrap = document.querySelector(".scroll-wrapper");
        scrollWrap.addEventListener("scroll", handleScrolling);

        // cleanup this component
        return () => {
            scrollWrap.removeEventListener("scroll", handleScrolling);
        };
    }, []);

    const handleScrolling = (e) => {
        const scrollWrap = e.target;
        const editorWrap = scrollWrap.querySelector(".ProseMirror");
        const animTarget = scrollWrap.querySelector("h1");
        const offset =
            scrollWrap.getBoundingClientRect().top - animTarget.getBoundingClientRect().top;
        console.log("Scroll Percentage: ", (offset / editorWrap?.clientHeight).toFixed(2));
    };

    return (
        <div className="tiptap-wrapper">
            <MenuBar editor={editor} slider={slider} />
            <div className="scroll-wrapper">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default Tiptap;
