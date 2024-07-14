export default function SmallDefault(props: {
    children: string,
    onClick?: () => any
}) {
    return (
        <button
            onClick={props.onClick && props.onClick}
            className={`
                flex items-center justify-center
                bg-black-1 text-white-1
                cursor-pointer overflow-hidden font-fs-m
                flex-shrink-0
                text-14 px-5 py-2 w-full`} 
            style={{ maxWidth: 353, borderRadius: '20px'}}
        >
            {props.children}
        </button>
    );
}