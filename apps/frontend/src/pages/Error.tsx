const Error = () => {
    const {error} = useLocation();
    return (
        <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        </div>
    );
    };

export default Error;