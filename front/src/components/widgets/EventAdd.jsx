import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useServicesContext from '../../hooks/useServicesContext';
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css';

function MyEditor({ editorState, setEditorState }) {
    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    // Function to toggle inline styles (bold, italic, underline, strikethrough)
    const toggleInlineStyle = (inlineStyle) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    // Function to toggle block styles (ordered/unordered lists)
    const toggleBlockType = (blockType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };
    
    return (
        <div>
            {/* Format controls */}
            <div className='flex w-auto rounded-lg px-2 *:px-2 py-1 shadow-inner border border-appsep divide-x divide-appsep mb-2'>
                <button className='font-bold' onClick={(e) => { e.preventDefault(); toggleInlineStyle('BOLD') }}>B</button>
                <button className='italic' onClick={(e) => { e.preventDefault(); toggleInlineStyle('ITALIC') }}>I</button>
                <button className='underline underline-offset-1 decoration-2' onClick={(e) => { e.preventDefault(); toggleInlineStyle('UNDERLINE') }}>U</button>
                <button className='line-through decoration-2' onClick={(e) => { e.preventDefault(); toggleInlineStyle('STRIKETHROUGH') }}>S</button>
                <button onClick={(e) => { e.preventDefault(); toggleBlockType('unordered-list-item') }}>Llista</button>
                <button onClick={(e) => { e.preventDefault(); toggleBlockType('ordered-list-item') }}>Llista ordenada</button>
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
    );
}

export const EventAdd = ({ closePopup, refresh }) => {
    const { services: { sessionService, eventService } } = useServicesContext();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    let token = sessionService.getToken();

    const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Define editorState here

    const onSubmit = async (data) => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const descriptionHTML = draftToHtml(rawContentState);
        data.description = descriptionHTML;
        eventService.create(token, data);
        reset();
        closePopup();
        refresh(true)
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className='flex flex-col md:w-3/4 xl:w-2/3 bg-appfg justify-center rounded-2xl shadow-xl p-8 my-8 sm:my-16 mx-0 lg:mx-10 mt-20 sm:mt-32 h-1/2*:text-apptext2'>
                <div className='flex w-full flex-row justify-end h-0'>
                    <button onClick={closePopup} className="relative bottom-5 left-5 block z-30 text-gray-500 hover:text-gray-800">
                        <XCircleIcon className="size-6" />
                    </button>
                </div>
                <form className='flex flex-col items-center w-full' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Nom</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep'
                            type="text" {...register("name", {
                                required: 'L\'esdeveniment ha de tindre nom',
                            })} />
                        {errors.name && <p className="text-apperror">{errors.name.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Descripció</label>
                        <MyEditor editorState={editorState} setEditorState={setEditorState} />
                    </div>
                    {/* <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Visibilitat</label>
                        <div>
                            <label>
                                <input type="radio" {...register("visibility", { required: 'Selecciona qui pot veure aquest esdeveniment' })} value="0" />
                                Només els responsables veuran les tasques
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="radio" {...register("visibility", { required: 'Selecciona qui pot veure aquest esdeveniment' })} value="1" />
                                Tothom podrà veure les tasques
                            </label>
                        </div>
                        {errors.visibility && <p className="text-apperror">{errors.visibility.message}</p>}
                    </div> */}
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Data</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep' type="date" {...register("date", { required: 'Has de seleccionar una data!' })} />
                        {errors.date && <p className="text-apperror">{errors.date.message}</p>}
                    </div>
                    <button type="submit" className='flex items-center gap-1 bg-appbutton text-white rounded-xl shadow-md my-4 px-6 py-3 font-bold hover:brightness-110 active:brightness-90'><PlusCircleIcon className='h-6 w-6'/>Crea l'esdeveniment</button>
                </form>
            </div>
        </div>
    );
};
