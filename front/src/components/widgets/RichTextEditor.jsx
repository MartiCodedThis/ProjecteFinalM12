import React, { useEffect } from 'react'
import { Editor, RichUtils, EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html'
import 'draft-js/dist/Draft.css'

export const RichTextEditor = ({ editorState, setEditorState, value }) => {
    useEffect(() => {
        if (value) {
            const contentState = stateFromHTML(value)
            setEditorState(EditorState.createWithContent(contentState))
        }
    }, [value, setEditorState]);

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            setEditorState(newState)
            return 'handled'
        }
        return 'not-handled'
    };

    const toggleInlineStyle = (inlineStyle) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const toggleBlockType = (blockType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType))
    }

    return (
        <div>
            <div className='flex w-auto rounded-lg px-2 *:px-2 sm:*:px-5 py-1 border border-appsep2 text-apptext2 divide-x divide-appsep2 mb-2'>
                <button className='font-bold hover:text-apptext' onClick={(e) => { e.preventDefault(); toggleInlineStyle('BOLD'); }}>B</button>
                <button className='italic hover:text-apptext' onClick={(e) => { e.preventDefault(); toggleInlineStyle('ITALIC'); }}>I</button>
                <button className='underline underline-offset-1 decoration-2 hover:text-apptext' onClick={(e) => { e.preventDefault(); toggleInlineStyle('UNDERLINE'); }}>U</button>
                <button className='line-through decoration-2 hover:text-apptext' onClick={(e) => { e.preventDefault(); toggleInlineStyle('STRIKETHROUGH'); }}>S</button>
                <button className='hover:text-apptext' onClick={(e) => { e.preventDefault(); toggleBlockType('unordered-list-item'); }}>Llista</button>
                <button className='hover:text-apptext' onClick={(e) => { e.preventDefault(); toggleBlockType('ordered-list-item'); }}>Llista ordenada</button>
            </div>
                <div className={"rounded-lg px-4 py-1 shadow-inner border border-appsep2 bg-white h-40 overflow-y-auto"}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    handleKeyCommand={handleKeyCommand}
                />
            </div>
        </div>
    )
}
