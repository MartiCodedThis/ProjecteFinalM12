import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useServicesContext from '../../hooks/useServicesContext';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { RichTextEditor } from './RichTextEditor';

export const TaskAdd = (props) => {
    const { services: { sessionService, taskService, authService } } = useServicesContext();
    const { register, handleSubmit, reset, formState: { errors }, setError, clearErrors } = useForm();
    let token = sessionService.getToken();
    const closePopup = props.closePopup;

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [userList, setUserList] = useState([]);

    const onSubmit = async (data) => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const descriptionHTML = draftToHtml(rawContentState);
        data.description = descriptionHTML;

        if (!data.responsables || data.responsables.length === 0) {
            setError('responsables', {
                type: 'manual',
                message: 'Cal seleccionar almenys un responsable'
            });
            return;
        }

        taskService.create(token, data).then(() => {
            props.refresh(true);
        });

        reset();
        setEditorState(EditorState.createEmpty());
        closePopup();
    };

    useEffect(() => {
        authService.listAuthUsers(token).then((e) => {
            setUserList(e.userlist);
        });
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className='flex h-full sm:h-3/4 flex-col md:w-3/4 xl:w-2/3 bg-appfg justify-center rounded-2xl shadow-xl p-8 my-8 sm:my-16 mx-0 lg:mx-10 mt-20 sm:mt-32'>
                <div className='flex w-full flex-row justify-end h-0'>
                    <button onClick={closePopup} className="relative top-5 sm:top-0 bottom-5 left-5 block z-30 text-gray-500 hover:text-gray-800">
                        <XCircleIcon className="size-6" />
                    </button>
                </div>
                <form className='flex flex-col items-center w-full overflow-y-auto' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex w-full flex-col mb-4 mt-8 sm:mt-0'>
                        <label className='font-bold mb-1'>Nom</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep'
                            type="text" {...register("name", {
                                required: 'La tasca necessita nom',
                            })} />
                        {errors.name && <p className="text-apperror">{errors.name.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Descripció</label>
                        <RichTextEditor editorState={editorState} setEditorState={setEditorState} />
                        {errors.description && <p className="text-apperror">{errors.description.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Visibilitat</label>
                        <div className='flex gap-1 *:mr-4'>
                            <label>
                                <input className="mr-1" type="radio" {...register("visibility", { required: 'Selecciona qui pot veure aquest esdeveniment' })} value="0" />
                                Només responsables
                            </label>
                            <label>
                                <input className="mr-1" type="radio" {...register("visibility", { required: 'Selecciona qui pot veure aquest esdeveniment' })} value="1" />
                                Tothom
                            </label>
                        </div>
                        {errors.visibility && <p className="text-apperror">{errors.visibility.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Data Límit</label>
                        <input className='rounded-lg px-4 py-1 shadow-inner border border-appsep' type="date" {...register("data_limit", { required: 'Has de seleccionar una data límit!' })} />
                        {errors.date && <p className="text-apperror">{errors.date.message}</p>}
                    </div>
                    <div className='flex w-full flex-col mb-4' >
                        <label className='font-bold mb-1'>Branca</label>
                        <div className='flex gap-1 flex-wrap *:mr-4'>
                            <div>
                                <input className='w-4 h-4 mr-2' type="checkbox" {...register("branca_id")} value="0" />
                                Follets
                            </div>
                            <div>
                                <input className='w-4 h-4 mr-2' type="checkbox" {...register("branca_id")} value="1" />
                                Llobatons
                            </div>
                            <div>
                                <input className='w-4 h-4 mr-2' type="checkbox" {...register("branca_id")} value="2" />
                                Puputs
                            </div>
                            <div>
                                <input className='w-4 h-4 mr-2' type="checkbox" {...register("branca_id")} value="3" />
                                Ràngers
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <label className='font-bold mb-1'>Càrrec</label>
                        <div className='flex gap-1 flex-wrap *:mr-4'>
                            <div>
                                <input className='w-4 h-4 mr-2' type="radio" {...register("carrec_id")} value="" />
                                Cap càrrec
                            </div>
                            <div>
                                <input className='w-4 h-4 mr-2' type="radio" {...register("carrec_id")} value="0" />
                                Equip d'Agrupament
                            </div>
                            <div>
                                <input className='w-4 h-4 mr-2' type="radio" {...register("carrec_id")} value="1" />
                                Pedagògic
                            </div>
                            <div>
                                <input className='w-4 h-4 mr-2' type="radio" {...register("carrec_id")} value="2" />
                                Tresoreria
                            </div>
                            <div>
                                <input className='w-4 h-4 mr-2' type="radio" {...register("carrec_id")} value="3" />
                                Secretaria
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full flex-col mb-4'>
                        <div>
                            <label className='font-bold'>Responsables:</label>
                            <div className='flex gap-1 flex-wrap *:mr-4'>
                                {userList.length > 0 ?
                                    userList.map((user, id) => {
                                        return (
                                            <div key={id}>
                                                <input className='w-4 h-4 mr-2' type="checkbox" {...register("responsables")} value={user.id} />
                                                {user.name}
                                            </div>
                                        );
                                    })
                                    : <p>Carregant usuaris...</p>}
                            </div>
                            {errors.responsables && <p className="text-apperror">{errors.responsables.message}</p>}
                        </div>
                    </div>
                    <input type="hidden"  {...register("event_id")} value={props.event_id} />
                    <button type="submit" className='flex items-center gap-1 bg-appbutton text-white rounded-xl shadow-md my-4 px-6 py-3 font-bold hover:brightness-110 active:brightness-90'><PlusCircleIcon className='h-6 w-6' />Crea la tasca</button>
                </form>
            </div>
        </div>
    );
};

export default TaskAdd;
