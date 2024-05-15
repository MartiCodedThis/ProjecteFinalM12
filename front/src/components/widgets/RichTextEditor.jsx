import { Editor, RichUtils } from 'draft-js'

import 'draft-js/dist/Draft.css'

export const RichTextEditor = ({ editorState, setEditorState, value }) => {
    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            setEditorState(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    // Function to toggle inline styles (bold, italic, underline, strikethrough)
    const toggleInlineStyle = (inlineStyle) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
    }

    // Function to toggle block styles (ordered/unordered lists)
    const toggleBlockType = (blockType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType))
    }
    
    return (
        <div>
            {/* Format controls */}
            <div className='flex w-auto rounded-lg px-2 *:px-2 py-1 shadow-inner border border-appsep divide-x divide-appsep mb-2'>
                <button className='font-bold' onClick={(e) => { e.preventDefault(); toggleInlineStyle('BOLD'); }}>B</button>
                <button className='italic' onClick={(e) => { e.preventDefault(); toggleInlineStyle('ITALIC'); }}>I</button>
                <button className='underline underline-offset-1 decoration-2' onClick={(e) => { e.preventDefault(); toggleInlineStyle('UNDERLINE'); }}>U</button>
                <button className='line-through decoration-2' onClick={(e) => { e.preventDefault(); toggleInlineStyle('STRIKETHROUGH'); }}>S</button>
                <button onClick={(e) => { e.preventDefault(); toggleBlockType('unordered-list-item'); }}>Llista</button>
                <button onClick={(e) => { e.preventDefault(); toggleBlockType('ordered-list-item'); }}>Llista ordenada</button>
            </div>
            {/* Draft.js editor */}
            <div className={"rounded-lg px-4 py-1 shadow-inner border border-appsep bg-white h-40 overflow-y-auto"}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    handleKeyCommand={handleKeyCommand} 
                />
            </div>
            
        </div>
    )
}