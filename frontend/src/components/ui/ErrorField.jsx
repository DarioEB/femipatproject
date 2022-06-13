


export const ErrorField = ({ message }) => {
    return (
        <div className="text-left py-1 mt-1 border-l-8 rounded-l border-red-700 pl-4">
            <p className="text-xs font-bold italic text-red-700">
                {message}
            </p>
        </div>
    );
};
