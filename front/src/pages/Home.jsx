import { ArrowLeftCircleIcon, ArrowRightCircleIcon} from '@heroicons/react/24/outline'

export const Home = () => {

    return (
        <>
            <div className="mb-12">
                <h2 className="text-5xl font-bold mb-4">Tasques setmanals</h2>
                <hr className="border-appsep mb-4"></hr>
                <div className='flex bg-appfg justify-center rounded-2xl shadow-xl p-16 my-16 mx-0 md:mx-20 *:text-apptext2'>
                    <button><ArrowLeftCircleIcon className="size-6"/></button>
                    <p className="m-6 text-l">1</p>
                    <button><ArrowRightCircleIcon className="size-6"/></button>
                </div>

            </div>
            <div className="mb-12">
                <h2 className="text-5xl font-bold mb-4">Feed de posts</h2>
                <hr className="border-appsep mb-4"></hr>
                <div className='flex bg-appfg content-center rounded-2xl shadow-xl p-16 my-16 mx-0 md:mx-20'>
                    <div className="w-2/3 ml-5 text-l">
                        <div className="w-full p-4 overflow-wrap break-word">
                            <h3 className="text-3xl font-bold mb-2">Post</h3>
                            <div className="flex w-full justify-between mb-4 *:text-sm *:italic *:text-apptext2">
                                <p>Author</p>
                                <p>Timestamp</p>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam, mi vel iaculis scelerisque, lacus neque congue sem, ac dignissim dolor ipsum at lorem. Aenean quis congue nisl, quis volutpat nisi. Sed eleifend lacinia euismod. Morbi id diam vel orci interdum porta. Proin interdum ligula sit amet semper aliquet. Donec sit amet pellentesque ex, nec condimentum dolor. Mauris molestie sagittis fringilla. Nulla eu purus blandit, eleifend orci hendrerit, consectetur arcu. Cras efficitur efficitur auctor.

                                Mauris in mauris mattis, suscipit enim ac, aliquam massa. In varius justo feugiat diam condimentum facilisis. In auctor lacus vel arcu sollicitudin, sit amet semper lorem aliquet. Vestibulum vestibulum finibus ultricies. Quisque vel eros nec metus eleifend hendrerit. Phasellus blandit, orci iaculis molestie aliquam, dui arcu faucibus nunc, a fringilla libero mi at diam. Sed vel augue sollicitudin, tincidunt nibh non, vehicula libero. Proin posuere sodales purus eu consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras placerat lorem nec pellentesque scelerisque. Nulla facilisi. Praesent eu vestibulum mauris. Donec congue nunc ac nunc suscipit laoreet.
                            </p>
                        </div>
                        <div className="w-full p-4 overflow-wrap break-word">
                            <h3 className="text-3xl font-bold mb-2">Post</h3>
                            <div className="flex w-full justify-between mb-4 *:text-sm *:italic *:text-apptext2">
                                <p>Author</p>
                                <p>Timestamp</p>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam, mi vel iaculis scelerisque, lacus neque congue sem, ac dignissim dolor ipsum at lorem. Aenean quis congue nisl, quis volutpat nisi. Sed eleifend lacinia euismod. Morbi id diam vel orci interdum porta. Proin interdum ligula sit amet semper aliquet. Donec sit amet pellentesque ex, nec condimentum dolor. Mauris molestie sagittis fringilla. Nulla eu purus blandit, eleifend orci hendrerit, consectetur arcu. Cras efficitur efficitur auctor.

                                Mauris in mauris mattis, suscipit enim ac, aliquam massa. In varius justo feugiat diam condimentum facilisis. In auctor lacus vel arcu sollicitudin, sit amet semper lorem aliquet. Vestibulum vestibulum finibus ultricies. Quisque vel eros nec metus eleifend hendrerit. Phasellus blandit, orci iaculis molestie aliquam, dui arcu faucibus nunc, a fringilla libero mi at diam. Sed vel augue sollicitudin, tincidunt nibh non, vehicula libero. Proin posuere sodales purus eu consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras placerat lorem nec pellentesque scelerisque. Nulla facilisi. Praesent eu vestibulum mauris. Donec congue nunc ac nunc suscipit laoreet.
                            </p>
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-col ml-5 text-l divide-y divide-appsep2 *:text-apptext2 overflow-wrap break-word">
                        <a href="" className="w-full p-4">Calendari</a>
                        <a href="" className="w-full p-4">Branques</a>
                        <a href="" className="w-full p-4">Càrrecs</a>
                    </div>
                </div>
            </div>
        </>
    )
}