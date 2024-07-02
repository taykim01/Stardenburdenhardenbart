export default function UserAction(props: {
    children: string
}) {
    return (
        <button className="flex gap-3 items-center px-5 py-3 rounded-full border-white-50 border-2 bg-white-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M16.6664 12.4996C16.0911 12.4996 15.6247 12.966 15.6247 13.5413C15.6247 14.1165 16.0911 14.5829 16.6664 14.5829V12.4996ZM10.6177 10.2154L9.88109 9.47888L10.6177 10.2154ZM20.8331 8.3329C20.8331 10.6341 18.9676 12.4996 16.6664 12.4996V14.5829C20.1182 14.5829 22.9164 11.7847 22.9164 8.3329H20.8331ZM16.6664 4.16623C18.9676 4.16623 20.8331 6.03171 20.8331 8.3329H22.9164C22.9164 4.88112 20.1182 2.08289 16.6664 2.08289V4.16623ZM12.4997 8.3329C12.4997 6.03171 14.3652 4.16623 16.6664 4.16623V2.08289C13.2146 2.08289 10.4164 4.88112 10.4164 8.3329H12.4997ZM11.3542 10.952L11.603 10.7032L10.1299 9.23007L9.88109 9.47888L11.3542 10.952ZM11.9937 13.6452L11.3542 13.0058L9.88108 14.4789L10.5205 15.1184L11.9937 13.6452ZM14.2975 13.3959L14.0481 13.6452L15.5212 15.1184L15.7706 14.869L14.2975 13.3959ZM15.7706 14.869C15.935 14.7046 16.2343 14.5829 16.6664 14.5829V12.4996C15.8974 12.4996 14.9824 12.7109 14.2975 13.3959L15.7706 14.869ZM10.5205 15.1184C11.9014 16.4993 14.1403 16.4993 15.5212 15.1184L14.0481 13.6452C13.4808 14.2125 12.561 14.2125 11.9937 13.6452L10.5205 15.1184ZM9.88109 9.47888C8.50036 10.8596 8.50035 13.0982 9.88108 14.4789L11.3542 13.0058C10.7871 12.4387 10.7871 11.5192 11.3542 10.952L9.88109 9.47888ZM10.4164 8.3329C10.4164 8.76563 10.2946 9.0654 10.1299 9.23007L11.603 10.7032C12.2884 10.0179 12.4997 9.10226 12.4997 8.3329H10.4164Z" fill="#B06C3B" />
                <path d="M6.77076 16.1457L9.89576 13.0207L11.9791 15.104L8.85409 18.229L6.56376 19.6032C6.37931 19.7139 6.14322 19.6848 5.99113 19.5327L5.46705 19.0086C5.31495 18.8565 5.28589 18.6205 5.39655 18.436L6.77076 16.1457Z" stroke="#B06C3B" strokeWidth="2.08334" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-m22 text-black font-fs-m">{props.children}</div>
        </button>
    )
}